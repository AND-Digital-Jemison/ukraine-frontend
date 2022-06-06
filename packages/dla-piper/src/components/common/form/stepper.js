import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar } from '.';
import { StyledButton } from '../';

const Stepper = ({ steps=['no steps passed'] }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = () => {
    setCurrentStep(step => {
      if (step === steps.length - 1) {
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

  return (
    <Box 
      variant='div'
      sx={{ 
        padding: '20px',
        backgroundColor: '#F8F8F8',
        borderRadius: '4px',

      }}
    >
      <Typography variant='p'
        sx={{
          fontSize: '14px',
          color: 'textColor.main',

        }}
      >
        Step {currentStep + 1} of {steps.length}
      </Typography>

      <ProgressBar progressPercent={((100 / (steps.length))) * (currentStep + 1)} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        { steps[currentStep] }
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledButton
          label='Previous'
          filled
          onClick={handlePreviousStep}
        />
        <StyledButton
          label='Next'
          filled
          onClick={handleNextStep}
        />
      </Box>
    </Box>
  )
}

export default Stepper;
