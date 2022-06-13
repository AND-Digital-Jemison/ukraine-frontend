import { Step, TextArea } from '../common/form';
import { useForm } from 'react-hook-form';
import { StyledButton } from '../common';
import { Box } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import Link from '@frontity/components/link';
import { useYupResolver } from "../../hooks";
import * as yup from 'yup';

const schema = {
  additional_risks: '',
}

const validationSchema = yup.object().shape({
  additional_risks: yup.string().max(10),
})

const AdditionalStep = ({ onNext, onPrevious }) => {

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

  useEffect(() => {
    console.log("additional step errors: ", errors)
}, [errors]);

  const onSubmit = data => {
    setValue(data);
  }

  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  }

  const handleNext = e => {
    handleSubmit(onSubmit)(e)
      .catch(err => {
        console.log("from catch: ", err)
      })

    // if (errors['additional_risks']) {
    //   return;
    // }
    // window.location.href = '/confirmation/en';
  }

  return (
    <Step label='Are there any reasons you may be at additional risk?'>
      <form >
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
          {/* <Link link='/confirmation/en' style={{textDecoration: 'none'}}> */}
          <StyledButton
            label='Submit'
            width={'115px'}
            onClick={handleNext}
          />
          {/* </Link> */}
        </Box>
      </form>
    </Step>
  )
}

export default AdditionalStep;
