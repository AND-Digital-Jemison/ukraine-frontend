import * as yup from 'yup';
import { useEffect } from 'react';
import { connect } from 'frontity';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Box } from '@mui/material';
import { FamilyMemberSelector, RadioButtonGroup, Step } from '../common/form';
import { StyledButton } from '../common';
import getFormButtonLabels from './getFormButtonLabels';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useYupResolver } from '../../hooks';

const options = [
  { label: 'Just me', value: 'alone' },
  { label: 'Me and my family', value: 'with_family' },
];

const schema = {
  traveling_with: '',
  family_members: [],
};

const validationSchema = yup.object().shape({
  traveling_with: yup.string().required('Please select an answer'),
  family_members: yup
    .array()
    .of(
      yup.object().shape({
        relation: yup.string().required('Please select a relation'),
      })
    )
    .when('traveling_with', {
      is: options[1].value,
      then: yup.array().min(1, 'Must have at least one family member'),
    }),
});

const TravelStep = ({ state, onNext, onPrevious }) => {
  const { next, back } = getFormButtonLabels(state);
  const [value, setValue] = useSessionStorage('au_travel_step', schema);

  const resolver = useYupResolver(validationSchema);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    trigger
  } = useForm({
    resolver,
    defaultValues: {
      traveling_with: '',
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'family_members',
  });

  const travelingWith = useWatch({
    control,
    name: 'traveling_with',
  });

  const familyMembers = useWatch({
    control,
    name: 'family_members',
  });

  useEffect(() => {
    if (travelingWith === options[0].value) {
      // remove all the old values from the fieldArray
      familyMembers.forEach(member => remove(member.id));
      // clean up any old errors (can be done by key name but in this
      // case we might as well just clean everything up)
      clearErrors(); 
    }

  }, [travelingWith]);

  useEffect(() => {
    if (travelingWith === options[1].value) {
    familyMembers.forEach(member => {
        trigger(member.id)
    });
  }
  }, [fields, trigger])

  useEffect(() => {
    reset(value)
  }, [value])

  const onSubmit = data => {
    setValue(data);
    if (!onNext) {
      return;
    }
    onNext();
  }

  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  }

  return (
    <Step label='Who are you traveling with?'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <RadioButtonGroup
            options={options}
            name='traveling_with'
            control={control}
          />
          {travelingWith === options[1].value && (
            <FamilyMemberSelector
              control={control}
              fields={fields}
              append={append}
              remove={remove}
              update={update}
              error={errors['family_members']}
            />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0 0 0',
          }}
        >
          <StyledButton
            label={back}
            width={'125px'}
            variant='outlined'
            onClick={handlePrevious}
          />
          <StyledButton label={next} width={'125px'} submit />
        </Box>
      </form>
    </Step>
  );
}

export default connect(TravelStep);
