import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DropDownList, relations } from '.';
import uuid from 'react-uuid';

class MemberOfFamily {
  constructor () {
    this.id = uuid();
    this.relation = '';
  }
}

const FamilyMemberSelector = ({ onChange }) => {
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleChange = () => {
    if (!onChange) {
      return;
    }
    onChange();
  }

  useEffect(() => {
    // every time the familyMembers array is changed, we need to call the onChange function
    // to pass the updated familyMembers array to the parent component
    handleChange(familyMembers);
  }, [familyMembers])

  const handleNewFamilyMember = () => {
    setFamilyMembers(members => ([...members, new MemberOfFamily]));
  };

  const handleUpdateFamilyMember = (member) => {
    setFamilyMembers(members => {
      return members.map(m => m.id === member.id ? member : m);
    });
  };

  const handleRemoveFamilyMember = id => {
    setFamilyMembers(members => {
      return members.filter(m => m.id !== id);
    })
  };

  return (
    <>
      {familyMembers.length > 0 &&
        familyMembers.map((member, index) => (
          <FamilyMember
            key={`family-member-${member.id}`}
            {...member}
            index={index}
            onChange={handleUpdateFamilyMember}
            onRemove={handleRemoveFamilyMember}
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
        { familyMembers.length > 0 ? 'Add another family member' : 'Add a family member' }
      </Typography>
    </>
  )
}

const FamilyMember = ({ id, relation, onRemove, onChange, index }) => {

  const [member, setMember] = useState({ id, relation });

  const handleStateUpdate = () => {
    if (!onChange) {
      return;
    }
    onChange(member);
  }

  // every time the member state is updated, send it to the parent component
  useEffect(() => handleStateUpdate, [member]);

  const handleRemove = () => {
    if (!onRemove) {
      return;
    }
    onRemove(id);
  }

  const handleDropDownChange = relation => {
    setMember(member => ({ ...member, relation: relation }));
  }

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
            label='Relation to you'
            width={'100%'}
            options={relations}
            onChange={handleDropDownChange}
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
            onClick={handleRemove}
          >
            Remove
          </Typography>
        </Box>
      </Box>

    </Box>
  )
}

export default FamilyMemberSelector;
