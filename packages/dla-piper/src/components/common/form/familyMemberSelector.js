import { Box, Typography } from '@mui/material';
import { DropDownList, relations } from '.';
import { useController } from 'react-hook-form';

const FamilyMemberSelector = ({ fields, append, update, remove, control }) => {

  const handleNewFamilyMember = () => {
    append({ relation: '' });  // add an empty field
  }

  return (
    <>
      {fields.length > 0 &&
        fields.map((field, index) => (
          <FamilyMember
            key={field.id}
            control={control}
            value={field}
            index={index}
            update={update}
            remove={remove}
          />
        ))}

      <Typography
        variant='p'
        sx={{
          color: '#2C6ECB',
          fontSize: '14px',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={handleNewFamilyMember}
      >
        { fields.length > 0 ? 'Add another family member' : 'Add a family member' }
      </Typography>
    </>
  )
}

const FamilyMember = ({ value, update, control, remove, index }) => {
  
  const { field: { onChange, ...fieldOther }, fieldState } = useController({
    name: `family_members[${index}].relation`,
    control,
  });

  const handleChange = e => {
    onChange(e);
    update(index, { relation: e.target.value });
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        tablet: '1fr 1fr',
        mobile: '1fr',
      },
      padding: '10px 0',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <Typography
          variant='h5'
          sx={{
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Family member { `${index + 1}` }
        </Typography>

        <Box sx={{
          position: 'relative',
        }}>
          <DropDownList
            name={`family_members[${index}].relation`}
            control={control}
            label='Relation to you'
            width={'100%'}
            options={relations}
            onChange={handleChange}
            defaultValue={value.relation}
          />
          <Typography
            variant='p'
            sx={{
              color: '#2C6ECB',
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '14px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => remove(index)}
          >
            Remove
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default FamilyMemberSelector;
