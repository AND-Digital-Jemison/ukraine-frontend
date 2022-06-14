import { Step, RadioButtonGroup, InputField, DropDownList, relations } from "../common/form";
import { useMemo, useEffect } from "react";
import { Label, StyledButton } from '../common';
import { Box } from '@mui/material';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useForm, useWatch } from 'react-hook-form';
import { useYupResolver } from '../../hooks';
import * as yup from 'yup';

const optionsFamily = ["No, I don't have a family member in the UK", "Yes, I have a family member in the UK"];
const optionsFamilyType = [
    "British citizen",
    "Settled in the UK (also known as indefinite leave to enter or remain, or settled status)",
    "Refugee or person with humanitarian protection in the UK",
    "Person with pre-settled status under the EU Settlement Scheme in the UK",
    "Non of the above"
];

const schema = {
  family_member_in_uk: '',
  best_describes_uk_family_member: optionsFamilyType[0],
  uk_family_first_name: '',
  uk_family_last_name: '',
  uk_family_relation_to_you: '',
}

const validationSchema = yup.object().shape({
  family_member_in_uk: yup.string().required('A selection is required'),
  best_describes_uk_family_member: yup.string().when(
    'family_member_in_uk', { is: optionsFamily[1], then: yup.string().required('Situation is required') }
  ),
  uk_family_first_name: yup.string().when(
    'family_member_in_uk', { is: optionsFamily[1], then: yup.string().max(64, 'cannot excide 64 characters').required('First name is required') }
  ),
  uk_family_last_name: yup.string().when(
    'family_member_in_uk', { is: optionsFamily[1], then: yup.string().max(64, 'cannot excide 64 characters').required('Last name is required') }
  ),
  uk_family_relation_to_you: yup.string().when(
    'family_member_in_uk', { is: optionsFamily[1], then: yup.string().required('Relation is required') } 
  ),
})

const FamilyStep = ({ onNext, onPrevious }) => {

  const [value, setValue] = useSessionStorage('au_family_in_uk', schema);
  const resolver = useYupResolver(validationSchema);
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver,
    defaultValues: useMemo(() => {
      return value;
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const hasFamily = useWatch({
    control,
    name: 'family_member_in_uk'
  });

  const onSubmit = data => {
    setValue(data);

    if (!onNext) {
      return;
    };
    onNext();
  };

  const handlePrevious = () => {

    if (!onPrevious) {
      return;
    }
    onPrevious();
  }


  return (
    <Step label="Do you have a family member in the UK?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioButtonGroup options={optionsFamily}
          name='family_member_in_uk'
          control={control} />
        <br />
        {hasFamily === optionsFamily[1] &&
          <>
            <Box>
              <RadioButtonGroup
                label="Which of the following best describes your UK based family member?"
                options={optionsFamilyType}
                name='best_describes_uk_family_member'
                control={control}
              // onChange={value => handleFamilyMemberChange("status", value)}
              />
              <Box sx={{ padding: '20px 0 0 0' }} >
                <Label
                  fontSize='16px'
                  fontWeight={600}
                >
                  Details of your UK based family member
                </Label>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  tablet: '1fr 1fr',
                  mobile: '1fr'
                },
                gap: '20px'
              }}
            >
              <InputField
                name='uk_family_first_name'
                control={control}
                label='First Name'
                width={'100%'}
              />
              <InputField
                control={control}
                name='uk_family_last_name'
                label='Last Name'
                width={'100%'}
              />
              <DropDownList
                control={control}
                name='uk_family_relation_to_you'
                label='Relation to you'
                options={relations}
              />
            </Box>
          </>
        }

        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0' }}>
          <StyledButton
            label='Back'
            width={'115px'}
            variant="outlined"
            onClick={handlePrevious}
          />
          <StyledButton
            label='Next'
            width={'115px'}
            submit
          />
        </Box>
      </form>
    </Step>
  );
}

export default FamilyStep;