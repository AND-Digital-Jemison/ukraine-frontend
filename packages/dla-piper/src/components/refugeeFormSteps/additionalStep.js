import { Step, TextArea } from '../common/form';
import { useState } from 'react';
import { StyledButton } from '../common';
import { Box } from '@mui/material';

const AdditionalStep = ({ onNext, onPrevious }) => {

  const [additionalState, setAdditionalState] = useState(null);
  const handleAdditionalChange = value => {
    setAdditionalState(value);
  }

  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  }

  return (
    <Step label='Are there any reasons you may be at additional risk?'>
      <form onSubmit={e => e.preventDefault()}>
      <TextArea 
        label='For example: Unaccompanied children or family members needing medical treatment. '
        width={'100%'}
        onChange={handleAdditionalChange}
      />

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
  )
}

export default AdditionalStep;
