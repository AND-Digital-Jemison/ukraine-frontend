import { useEffect, useState } from "react";
import { connect } from "frontity";
import { Typography } from "@mui/material";
import {
  InfoContainer,
  InfoItem,
  MaxRestraintWrapper,
  PageHeader,
} from "../common";
import { Stepper } from "../common/form";
import { WhoAreYouStep, TravelStep, VisaStep, FamilyStep, AdditionalStep } from "../refugeeFormSteps";

const RefugeeForm = ({ state }) => {
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const {
    rfTitle,
    rfDescription,
    rfInfoTitle,
    rfInfoListItems,
  } = refugeeForm.acf;

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

  const handleSubmitForm = () => {
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
        ...travel,
        ...visa,
        ...familyInUk,
        ...additionalRisks,
      }
    }

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
      </PageHeader>
      
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
