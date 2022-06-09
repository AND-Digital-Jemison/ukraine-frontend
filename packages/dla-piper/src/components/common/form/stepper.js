import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProgressBar } from '.';
import { StyledButton } from '../';

const Stepper = ({ currentStep, steps=['no steps passed'] }) => {

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
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        { steps[currentStep] }
      </Box>
    </Box>
  )
}

export default Stepper;
