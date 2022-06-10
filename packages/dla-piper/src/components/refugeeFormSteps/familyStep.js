import { Step, RadioButtonGroup, InputField, DropDownList, relations } from "../common/form";
import { useMemo, useEffect } from "react";
import { Label, StyledButton } from '../common';
import { Box } from '@mui/material';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useForm, useWatch } from 'react-hook-form';

const schema = {
  familyMember: '',
  familyMemberType: '',
  familyMemberFirstName: '',
  familyMemberLastName: '',
  familyMemberRelation: '',
}

const FamilyStep = ({ onNext, onPrevious }) => {

  const optionsFamily = ["No, I don't have a family member in the UK", "Yes, I have a family member in the UK"];
  const optionsFamilyType = [
    "British citizen",
    "Settled in the UK (also known as indefinite leave to enter or remain, or settled status)",
    "Refugee or person with humanitarian protection in the UK",
    "Person with pre-settled status under the EU Settlement Scheme in the UK",
    "Non of the above"
  ];

  const [value, setValue] = useSessionStorage('au_family_in_uk', schema);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return value;
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const hasFamily = useWatch({
    control,
    name: 'familyMember'
  });

  const onSubmit = data => {
    setValue(data);
    console.log('test data', data);

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
    <Step label="Do you have any existing visas for the UK?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioButtonGroup options={optionsFamily}
          name='familyMember'
          control={control} />
        <br />
        {hasFamily === optionsFamily[1] &&
          <>
            <Box>
              <RadioButtonGroup
                label="Which of the following best describes your UK based family member?"
                options={optionsFamilyType}
                name='familyMemberType'
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
                name='familyMemberFirstName'
                control={control}
                label='First Name'
                width={'100%'}
              />
              <InputField
                control={control}
                name='familyMemberLastName'
                label='Last Name'
                width={'100%'}
              />
              <DropDownList
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