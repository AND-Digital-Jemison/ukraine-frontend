import { useEffect, useState } from "react";
import { connect } from "frontity";
import { Box, Typography } from "@mui/material";
import {
  InfoContainer,
  InfoItem,
  MaxRestraintWrapper,
  NotificationBlock,
  PageHeader,
} from "../common";
import { Stepper } from "../common/form";
import { WhoAreYouStep, TravelStep, VisaStep, FamilyStep, AdditionalStep } from "../refugeeFormSteps";
import { CheckCircleOutline } from '@mui/icons-material';

const RefugeeForm = ({ state }) => {
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const {
    rfTitle,
    rfDescription,
    rfInfoTitle,
    rfInfoListItems,
  } = refugeeForm.acf;

  const [isRequestError, setIsRequestError] = useState(false);

  // stepper state etc...
  const [currentStep, setCurrentStep] = useState(0);
  const formConfig = [
    { step: 1 },
    { step: 2 },
    { step: 3 },
    { step: 4 },
    { step: 5 },
  ]
  const handleNextStep = () => {
    setCurrentStep(step => {
      if (step === formConfig.length - 1) {
        return step;
      }
      return step + 1;
    })
  }
  const handlePreviousStep = () => {
    setCurrentStep(step => {
      if (step === 0) {
        return step;
      }
      return step - 1;
    })
  }

  const handleSubmitForm = async () => {
    const whoAreYou = JSON.parse(sessionStorage.getItem('au_who_are_you'));
    const travel = JSON.parse(sessionStorage.getItem('au_travel_step'));
    const visa = JSON.parse(sessionStorage.getItem('au_visa_step'));
    const familyInUk = JSON.parse(sessionStorage.getItem('au_family_in_uk'));
    const additionalRisks = JSON.parse(sessionStorage.getItem('au_additional_risks'));

    const payload = {
      client: {
        ...whoAreYou,
      },
      info: {
        // travel step
        traveling_with: travel.traveling_with,
        family_members: travel.family_members.map(m => m.relation).join(', '),
        // visa step - no idea why they did it like this
        have_visa: visa.has_visa,
        working_visa: visa.visa_type === 'working_visa' ? 'yes' : 'no',
        study_visa: visa.visa_type === 'study_visa' ? 'yes' : 'no',
        settlement_indefinite_visa: visa.visa_type === 'settlement_indefinite_visa' ? 'yes' : 'no',
        visitor_visa: visa.visa_type === 'visitor_visa' ? 'yes' : 'no',
        family_visa: visa.visa_type === 'family_visa' ? 'yes' : 'no',
        refugee_visa: visa.visa_type === 'refugee_visa' ? 'yes' : 'no',
        discretionary_leave_visa: visa.visa_type === 'discretionary_leave_visa' ? 'yes' : 'no',
        permanent_living_visa: visa.visa_type === 'permanent_living_visa' ? 'yes' : 'no',
        presettled_visa: visa.visa_type === 'presettled_visa' ? 'yes' : 'no',
        british_citizenship_visa: visa.visa_type === 'british_citizenship_visa' ? 'yes' : 'no',
        other_visa: visa.visa_type === 'other_visa' ? 'yes' : 'no',
        // family step
        family_member_in_uk: 'no',
        best_describes_uk_family_member: 'british',
        uk_family_first_name: 'text value',
        uk_family_last_name: 'text value',
        uk_family_email: 'text value',
        uk_family_phone: 'text value',
        uk_family_relation_to_you: 'mother',
        // additional step
        why_do_you_need_legal_assistance: 'join_family_or_friends',
        additional_risks: 'text value'
      }

    }
    setIsRequestError(true);

    console.log(payload);
  }

  return (
    <>
      <PageHeader>
        <MaxRestraintWrapper>
          <Typography
            variant="h1"
            color="textColor.main"
            sx={{
              fontWeight: 600,
              fontSize: "42px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: "0 0 20px 0",
            }}
          >
            {rfTitle}
          </Typography>
          <Typography
            paragraph
            color="textColor.main"
            sx={{
              fontWeight: 400,
              fontSize: "15px",
            }}
          >
            {rfDescription}
          </Typography>
        </MaxRestraintWrapper>
      </PageHeader>

      <MaxRestraintWrapper>
        {rfInfoListItems && (
          <InfoContainer title={rfInfoTitle}>
            {rfInfoListItems.length > 0 &&
              rfInfoListItems
                .split("<br />")
                .map((item, index) => (
                  <InfoItem li={item} key={`rfLI-${index}`} />
                ))}
          </InfoContainer>
        )}
      </MaxRestraintWrapper>

      {isRequestError &&
        <MaxRestraintWrapper>
          <Box sx={{ margin: '0 0 20px 0' }}>
            <NotificationBlock
              type='error'
              message={'Something went wrong. Please try again later.'}
            />
          </Box>
        </MaxRestraintWrapper>
      }

      <MaxRestraintWrapper>
        <Stepper
          currentStep={currentStep}
          steps={[
            <WhoAreYouStep onNext={handleNextStep} />,
            <TravelStep onNext={handleNextStep} onPrevious={handlePreviousStep} />,
            <VisaStep onNext={handleNextStep} onPrevious={handlePreviousStep} />,
            <FamilyStep onNext={handleNextStep} onPrevious={handlePreviousStep} />,
            <AdditionalStep onNext={handleSubmitForm} onPrevious={handlePreviousStep} />,
          ]}
        />
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(RefugeeForm);
