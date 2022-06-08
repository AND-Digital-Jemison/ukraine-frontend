import { Step, TextArea } from '../common/form';
import { useState } from 'react';

const AdditionalStep = () => {

  const [additionalState, setAdditionalState] = useState(null);
  const handleAdditionalChange = value => {
    setAdditionalState(value);
  }

  return (
    <Step label='Are there any reasons you may be at additional risk?'>
      <TextArea 
        label='For example: Unaccompanied children or family members needing medical treatment. '
        width={'100%'}
        onChange={handleAdditionalChange}
      />
    </Step>
  )
}

export default AdditionalStep;
