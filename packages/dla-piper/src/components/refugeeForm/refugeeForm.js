import { useState } from 'react';
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
  AdditionalStep,
} from '../refugeeFormSteps';
import { optionsFamily, optionsVisaType } from '../refugeeFormSteps';

const RefugeeForm = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const { rfTitle, rfDescription, rfInfoTitle, rfInfoListItems } =
    refugeeForm.acf;

  const [isRequestError, setIsRequestError] = useState(false);

  // stepper state etc...
  const [currentStep, setCurrentStep] = useState(0);
  const formConfig = [
    { step: 1 },
    { step: 2 },
    { step: 3 },
    { step: 4 },
    { step: 5 },
  ];
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
    const whoAreYou = JSON.parse(sessionStorage.getItem('au_who_are_you'));
    const travel = JSON.parse(sessionStorage.getItem('au_travel_step'));
    const visa = JSON.parse(sessionStorage.getItem('au_visa_step'));
    const visaTypes = optionsVisaType.map(({ value }) =>
      value === visa.visa_type ? { [value]: 'yes' } : { [value]: 'no' }
    );
    const familyInUk = JSON.parse(sessionStorage.getItem('au_family_in_uk'));
    const additionalRisks = JSON.parse(sessionStorage.getItem('au_additional'));
    console.log('additionalRisks', additionalRisks)
    const payload = {
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
        // additional step
        additional_risks: additionalRisks.additional_risks,
      },
    };

    console.log('payload:', payload);

    try {
      const response = await fetch(
        'https://app.legalconnection.co/dlapiper/ukraine/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      console.log('response', response);

      if (response.status === 200) {
        actions.router.set('/confirmation/en/');
      } else {
        throw new Error('Something went wrong submitting the data')
      }

    } catch (error) {
      console.error(error);
      setIsRequestError(true);
    }
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
            <AdditionalStep
              onNext={handleSubmitForm}
              onPrevious={handlePreviousStep}
            />,
          ]}
        />
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(RefugeeForm);
