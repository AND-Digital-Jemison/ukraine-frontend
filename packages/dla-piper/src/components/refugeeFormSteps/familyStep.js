import { Step, RadioButtonGroup, InputField, DropDownList, relations } from "../common/form";
import { useState } from "react";
import { Label } from '../common';
import { Box } from '@mui/material';

const FamilyStep = () => {
  const optionsFamily = ["No, I don't have a family member in the UK", "Yes, I have a family member in the UK"];
  const optionsFamilyType = [
    "British citizen",
    "Settled in the UK (also known as indefinite leave to enter or remain, or settled status)",
    "Refugee or person with humanitarian protection in the UK",
    "Person with pre-settled status under the EU Settlement Scheme in the UK",
    "Non of the above"
  ];

  const [familyState, setFamilyState] = useState({
    option: optionsFamily[0],
    familyMember: {
      status: null,
      firstName: null,
      lastName: null,
      relation: null,
    },
  });

  const handleHasFamilyChange = option => {
    setFamilyState(state => {
      return { ...state, option: option };
    })
  }

  const handleFamilyMemberChange = (key, value) => {
    setFamilyState(state => {
      return { ...state, familyMember: { ...state.familyMember, [key]: value } };
    })
  }

  return (
    <Step label="Do you have any existing visas for the UK?">
      <RadioButtonGroup options={optionsFamily} onChange={handleHasFamilyChange} />
      <br />
      {familyState.option === optionsFamily[1] &&
        <>
          <Box>
            <RadioButtonGroup
              label="Which of the following best describes your UK based family member?"
              options={optionsFamilyType}
              onChange={value => handleFamilyMemberChange("status", value)}
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
              label='First Name'
              onChange={value => handleFamilyMemberChange("firstName", value)}
            />
            <InputField 
              label='Last Name'
              onChange={value => handleFamilyMemberChange("lastName", value)}
            />
            <DropDownList
              label='Relation to you'
              options={relations}
              onChange={value => handleFamilyMemberChange("relation", value)}
            />
          </Box>
        </>
      }
    </Step>
  );
}

export default FamilyStep;