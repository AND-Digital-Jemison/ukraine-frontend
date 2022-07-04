import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { connect } from 'frontity';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { StyledButton } from '../common';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { Step, TextArea } from '../common/form';
import getFormButtonLabels from './getFormButtonLabels';
import { useYupResolver } from "../../hooks";

const schema = {
  additional_risks: '',
}

const validationSchema = yup.object().shape({
  additional_risks: yup.string().max(5000, 'Please enter a maximum of 5000 characters'),
})

const AdditionalStep = ({ state, onNext, onPrevious, isSubmitting}) => {
  const { back, submit } = getFormButtonLabels(state);
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

  }

  // redirect the user if the submit button has been pressed and the form is valid
  useEffect(() => {
    if (formSubmitted && !errors.additional_risks) {
      if (!onNext) {
        return;
      }
      onNext();
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
        placeholder='optional'
        width={'100%'}
      />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0' }}>
          <StyledButton
            label={back}
            width={'125px'}
            variant="outlined"
            onClick={handlePrevious}
            disabled={isSubmitting}
          />
          <StyledButton
            label={submit}
            width={'125px'}
            submit
            disabled={isSubmitting}
          />
        </Box>
      </form>
    </Step>
  )
}

export default connect(AdditionalStep);
