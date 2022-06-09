import { Step, RadioButtonGroup, InputField, DropDownList, relations } from "../common/form";
import { useState, useMemo, useEffect } from "react";
import { Label } from '../common';
import { Box } from '@mui/material';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useForm } from 'react-hook-form';

const schema = {
  familyMember: '',
  familyMemberType: '',
  familyMemberFirstName: '',
  familyMemberLastName: '',
  familyMemberRelation: '',
}

const FamilyStep = () => {
  
  const [value, setValue] = useSessionStorage('au_family_in_uk', schema);
  
  const { control, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return value;
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const onSubmit = data => {
    setValue(data);
    console.log('data test', data);
  };

  // const [familyState, setFamilyState] = useState({
  //   option: optionsFamily[0],
  //   familyMember: {
  //     status: null,
  //     firstName: null,
  //     lastName: null,
  //     relation: null,
  //   },
  // });

  // const handleHasFamilyChange = option => {
  //   setFamilyState(state => {
  //     return { ...state, option: option };
  //   })
  // }

  // const handleFamilyMemberChange = (key, value) => {
  //   setFamilyState(state => {
  //     return { ...state, familyMember: { ...state.familyMember, [key]: value } };
  //   })
  // }

  const optionsFamily = ["No, I don't have a family member in the UK", "Yes, I have a family member in the UK"];
  const optionsFamilyType = [
    "British citizen",
    "Settled in the UK (also known as indefinite leave to enter or remain, or settled status)",
    "Refugee or person with humanitarian protection in the UK",
    "Person with pre-settled status under the EU Settlement Scheme in the UK",
    "Non of the above"
  ];

  return (
    <Step label="Do you have any existing visas for the UK?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioButtonGroup options={optionsFamily} 
        name='familyMember'
        control={control} />
        <br />
        {value.familyMember === optionsFamily[1] &&
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
                // onChange={value => handleFamilyMemberChange("relation", value)}
              />
            </Box>
          </>
        }

        <input type="submit" value="Next" /> 
      </form>
    </Step>
  );
}

export default FamilyStep;