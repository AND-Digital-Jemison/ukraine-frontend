import { Step, TextArea } from '../common/form';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../common';
import { Box } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import Link from '@frontity/components/link';

const schema = {
  additionalInfo: '',
}

const AdditionalStep = ({ onNext, onPrevious }) => {

  const [value, setValue] = useSessionStorage('au_additional', schema);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return value;
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const onSubmit = data => {
    setValue(data);
  }

  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  }

  return (
    <Step label='Are there any reasons you may be at additional risk?'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea 
        name={'additionalInfo'}
        control={control}
        label='For example: Unaccompanied children or family members needing medical treatment. '
        width={'100%'}
      />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0' }}>
          <StyledButton
            label='Back'
            width={'115px'}
            variant="outlined"
            onClick={handlePrevious}
          />
          <Link link='/confirmation/en' style={{textDecoration: 'none'}}>
          <StyledButton
            label='Submit'
            width={'115px'}
            submit
          />
          </Link>
        </Box>
      </form>
    </Step>
  )
}

export default AdditionalStep;
