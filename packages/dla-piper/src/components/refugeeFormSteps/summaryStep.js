import * as yup from 'yup';
import { useEffect, useMemo } from 'react';
import { connect } from 'frontity';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Step, TextArea } from '../common/form';
import { StyledButton } from '../common';
import getFormButtonLabels from './getFormButtonLabels';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useYupResolver } from "../../hooks";

const schema = {
    summarise_help_needed: '',
}

const validationSchema = yup.object().shape({
    summarise_help_needed: yup.string().max(5000, 'Please enter a maximum of 5000 characters').required('Please provide an answer'),
})

const SummaryStep = ({ state, onNext, onPrevious }) => {
  const { next, back } = getFormButtonLabels(state);
  const [value, setValue] = useSessionStorage('au_summary', schema);
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

  const onSubmit = (data) => {
    setValue(data);

    if (!onNext) {
      return;
    }
    onNext();
  };


  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  }

  return (
    <Step label='Please tell us why you need help?'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea 
        name={'summarise_help_needed'}
        control={control}
        label='For example: Currently residing in a refugee camp.'
        placeholder=''
        width={'100%'}
      />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0 0' }}>
          <StyledButton
            label={back}
            width={'115px'}
            variant="outlined"
            onClick={handlePrevious}
          />
          <StyledButton
            label={next}
            width={'115px'}
            submit
          />
        </Box>
      </form>
    </Step>
  )
}

export default connect(SummaryStep);
