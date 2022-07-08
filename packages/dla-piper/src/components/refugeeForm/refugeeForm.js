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
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { getRequestPayload } from './utils';


const RefugeeForm = ({ state, actions }) => {
  // frontity state
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const { 
    rfTitle, 
    rfDescription, 
    rfInfoTitle, 
    rfInfoListItems,
    rfAlreadyRegistered,
    rfGeneralError,
  } = refugeeForm.acf;
  const currentLanguage = state.theme.currentLanguage;

  // form state
  const [form, setFormStatus] = useState({
    isSubmitting: false,
    isReady: false,
    isCompleted: false,
    error: null,
  })
  const [currentStep, setCurrentStep] = useSessionStorage('currentStep', 0);
  const formConfig = [
    { step: 1 },
    { step: 2 },
    { step: 3 },
    { step: 4 },
    { step: 5 },
    { step: 6 },
  ];

  // check to see if the form has already been submitted
  // if so, redirect to the confirmation page
  useEffect(() => {
    const formComplete = Boolean(sessionStorage.getItem('isFormCompleted'));
    
    setFormStatus(state => ({
      ...state,
      isReady: true,
      isCompleted: formComplete,
    }));
  }, [ ]);

  useEffect(() => {
    if (form.isReady && form.isCompleted) {
      actions.router.set(`/confirmation/${currentLanguage}/`)
    } 
  }, [form]);

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
    if (form.isSubmitting) return;

    const payload = getRequestPayload(sessionStorage);

    // clear any previous errors from the form state
    // and set the form to submitting to prevent multiple submissions
    setFormStatus(state => ({
      ...state,
      isSubmitting: true,
      error: null,
    }));

    try {
      const legalConnectionResponse = await fetch(
        state.env.LEGAL_CONNECTION_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )
        .then(res => {
          switch (res.status) {
            case 200:
              return res.json();
            
            case 406:
              throw new Error(rfAlreadyRegistered);

            default:
              throw new Error(rfGeneralError);
          }
        })

      if (legalConnectionResponse.result !== 'success') {
        throw new Error(legalConnectionResponse.msg ? legalConnectionResponse.msg : rfGeneralError);
      }
      
      // the form should now be completed so update the form state,
      // session storage and redirect to the confirmation page
      setFormStatus(state => ({
        ...state,
        isSubmitting: false,
        isCompleted: true,
      }));
      sessionStorage.setItem('isFormCompleted', true);

      // also log this submission to our logs, however we don't
      // need to wait for this request to finish or care about
      // its response as it does't effect the users experience
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
    
    } catch (error) {
      setFormStatus(state => ({
        ...state,
        isSubmitting: false,
        error,
      }));
    }
  };

  if (!form.isReady) {
    return <></>;
  }

  if (form.isReady && form.isCompleted) {
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

      {form.error && (
        <MaxRestraintWrapper>
          <Box sx={{ margin: '0 0 20px 0' }}>
            <NotificationBlock
              type='error'
              message={form.error.message}
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
              isSubmitting={form.isSubmitting}
            />,
          ]}
        />
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(RefugeeForm);
