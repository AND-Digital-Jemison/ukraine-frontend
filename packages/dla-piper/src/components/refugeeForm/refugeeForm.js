import { useState, useEffect } from 'react';
import { connect } from 'frontity';
import { Box, Typography } from '@mui/material';
import {
  InfoContainer,
  InfoItem,
  MaxRestraintWrapper,
  NotificationBlock,
  PageHeader,
} from '../common';
import { Stepper } from '../common/form';
import {
  WhoAreYouStep,
  TravelStep,
  VisaStep,
  FamilyStep,
  SummaryStep,
  AdditionalStep,
} from '../refugeeFormSteps';
import { optionsFamily, optionsVisaType } from '../refugeeFormSteps';

const getRequestPayload = () => {
  const whoAreYou = JSON.parse(sessionStorage.getItem('au_who_are_you'));
  const travel = JSON.parse(sessionStorage.getItem('au_travel_step'));
  const visa = JSON.parse(sessionStorage.getItem('au_visa_step'));
  const visaTypes = optionsVisaType.map(({ value }) =>
    value === visa.visa_type ? { [value]: 'yes' } : { [value]: 'no' }
  );
  const familyInUk = JSON.parse(sessionStorage.getItem('au_family_in_uk'));
  const summary = JSON.parse(sessionStorage.getItem('au_summary'));
  const additionalRisks = JSON.parse(sessionStorage.getItem('au_additional'));
  
  return {
    client: {
      ...whoAreYou,
    },
    info: {
      // travel step
      traveling_with: travel.traveling_with,
      family_members: travel.family_members.map((m) => m.relation).join(', '),
      // visa step
      have_visa: visa.have_visa,
      ...Object.assign({}, ...visaTypes),
      // family step
      family_member_in_uk:
        familyInUk.family_member_in_uk === optionsFamily[0] ? 'no' : 'yes',
      best_describes_uk_family_member:
        familyInUk.best_describes_uk_family_member,
      uk_family_first_name: familyInUk.uk_family_first_name,
      uk_family_last_name: familyInUk.uk_family_last_name,
      uk_family_last_name: familyInUk.uk_family_last_name,
      uk_family_email: familyInUk?.uk_family_email ?? '', // TODO: do we need to collect this?
      uk_family_phone: familyInUk?.uk_family_phone ?? '', // TODO: do we need to collect this?
      uk_family_relation_to_you: familyInUk.uk_family_relation_to_you,
      // Summary step
      summarise_help_needed: summary.summarise_help_needed,
      // additional step
      additional_risks: additionalRisks.additional_risks,
    },
  };
}

const RefugeeForm = ({ state, actions }) => {
  // stepper state etc...
  const [currentStep, setCurrentStep] = useState(0);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentLanguage = state.theme.currentLanguage;
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const { rfTitle, rfDescription, rfInfoTitle, rfInfoListItems } =
    refugeeForm.acf;

  const [formStatus, setFormStatus] = useState({
    isReady: false,
    isCompleted: false,
  })

  const formConfig = [
    { step: 1 },
    { step: 2 },
    { step: 3 },
    { step: 4 },
    { step: 5 },
    { step: 6 },
  ];

  useEffect(() => {
    const formComplete = Boolean(sessionStorage.getItem('isFormCompleted'));
    
    setFormStatus(() => ({
      isReady: true,
      isCompleted: formComplete,
    }));
  }, [ ])

  useEffect(() => {
    console.log('form status', formStatus);

    if (formStatus.isReady && formStatus.isCompleted) {
      actions.router.set(`/confirmation/${currentLanguage}/`)
    } 
  }, [formStatus]);

  const handleNextStep = () => {
    setCurrentStep((step) => {
      if (step === formConfig.length - 1) {
        return step;
      }
      return step + 1;
    });
  };

  const handlePreviousStep = () => {
    setCurrentStep((step) => {
      if (step === 0) {
        return step;
      }
      return step - 1;
    });
  };

  const handleSubmitForm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = getRequestPayload();

    // log the request to mongoDB
    fetch(
      state.env.LOG_API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          name: payload?.client?.firstname,
          email: payload?.client?.email,
        }),
      }
    )

    try {
      const response = await fetch(
        state.env.LEGAL_CONNECTION_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 200) {
        sessionStorage.setItem('isFormCompleted', true);
        actions.router.set(`/confirmation/${currentLanguage}/`);

      } else {
        throw new Error('Something went wrong submitting the data')
      }

    } catch (error) {
      console.error(error);
      setIsRequestError(true);
    }
    setIsSubmitting(false);
  };

  if (!formStatus.isReady) {
    return <></>;
  }

  if (formStatus.isReady && formStatus.isCompleted) {
    return <></>;
  };

  return (
    <>
      <PageHeader>
        <MaxRestraintWrapper>
          <Typography
            variant='h1'
            color='textColor.main'
            sx={{
              fontWeight: 600,
              fontSize: '42px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: '0 0 20px 0',
            }}
          >
            {rfTitle}
          </Typography>
          <Typography
            paragraph
            color='textColor.main'
            sx={{
              fontWeight: 400,
              fontSize: '15px',
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
                .split('<br />')
                .map((item, index) => (
                  <InfoItem li={item} key={`rfLI-${index}`} />
                ))}
          </InfoContainer>
        )}
      </MaxRestraintWrapper>

      {isRequestError && (
        <MaxRestraintWrapper>
          <Box sx={{ margin: '0 0 20px 0' }}>
            <NotificationBlock
              type='error'
              message={'Something went wrong. Please try again later.'}
            />
          </Box>
        </MaxRestraintWrapper>
      )}

      <MaxRestraintWrapper>
        <Stepper
          currentStep={currentStep}
          steps={[
            <WhoAreYouStep onNext={handleNextStep} />,
            <TravelStep
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />,
            <VisaStep
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />,
            <FamilyStep
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />,
            <SummaryStep
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />,
            <AdditionalStep
              onNext={handleSubmitForm}
              onPrevious={handlePreviousStep}
              isSubmitting={isSubmitting}
            />,
          ]}
        />
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(RefugeeForm);
