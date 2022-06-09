import { InputField, DatePicker, Step } from "../common/form";
import { StyledButton } from '../common';
import { Box } from '@mui/material';
import { useWatch, useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';

const schema = {
  firstName: '',
  lastName: '',
  dob: '',
  email: '',
}

const WhoAreYouStep = ({ onNext }) => {

  const [value, setValue] = useSessionStorage('au_who_are_you', schema);

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

    if (!onNext) {
      return;
    }
    onNext();
  };

  return (
    <Step label="Who are you?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            mobile: '1fr',
            tablet: '1fr 1fr'
          },
          flex: 1,
          gap: '20px'
        }}>
          <InputField
            name='firstName'
            control={control}
            label="First name"
            width='100%'
          />
          <InputField
            name='lastName'
            control={control}
            label="Last name"
            width='100%'
          />
          <DatePicker
            name='dob'
            control={control}
            label='Date of birth'
            width='100%'
          />
          <InputField
            name='email'
            control={control}
            label="Email"
            width='100%'
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0' }}>
          <StyledButton
            label='Back'
            width={'115px'}
            variant="outlined"
          />
          <StyledButton
            label='Next'
            width={'115px'}
            submit
          />
        </Box>
      </form>
    </Step>
  );
};

export default WhoAreYouStep;
