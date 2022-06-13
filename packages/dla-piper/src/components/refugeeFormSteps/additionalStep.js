import { Step, TextArea } from '../common/form';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../common';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import Link from '@frontity/components/link';
import { useYupResolver } from "../../hooks";
import * as yup from 'yup';

const schema = {
  additional_risks: '',
}

const validationSchema = yup.object().shape({
  additional_risks: yup.string().max(5000, 'Please enter a maximum of 5000 characters'),
})

const AdditionalStep = ({ onNext, onPrevious }) => {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [value, setValue] = useSessionStorage('au_additional', schema);
  const resolver = useYupResolver(validationSchema);
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver,
    defaultValues: useMemo(() => {
      return value;
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const onSubmit = data => {
    setValue(data);
    setFormSubmitted(true);

    if (!onNext) {
      return;
    }
    onNext();
  }

  // redirect the user if the submit button has been pressed and the form is valid
  useEffect(() => {
    if (formSubmitted && !errors.additional_risks) {
      window.location.href = '/confirmation/en';
      return;
    }
    setFormSubmitted(false);

  }, [errors, formSubmitted])

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
        name={'additional_risks'}
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
          <StyledButton
            label='Submit'
            width={'115px'}
            submit
          />
        </Box>
      </form>
    </Step>
  )
}

export default AdditionalStep;
