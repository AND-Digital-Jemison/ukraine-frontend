import { InputField, DropDownList, Step } from "../common/form";
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';

const WhoAreYouStep = () => {

  const [value, setValue] = useSessionStorage('au_who_are_you');
  
  const { control, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return value ? value : {
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
      };
    }, [value])
  });

  useEffect(() => {
    reset(value)
  }, [value])

  const onSubmit = data => {
    setValue(data);
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
            defaultValue={value ? value?.firstName : 'cheese'}
            label="First name" 
            width='100%' 
          />
          <InputField 
            name='lastName'
            control={control}
            label="Last name" 
            width='100%'
          />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}>
            <DropDownList label="Date of birth" placeholder="dd" width='100%' />
            <DropDownList  placeholder="mm" width='100%' />
            <DropDownList  placeholder="yyyy" width='100%' />
          </Box>
          <InputField
            name='email'
            control={control}
            label="Email"
            width='100%'
          />
        </Box>

        <input type="submit" value="Next" />
      </form>
    </Step>
  );
};

export default WhoAreYouStep;
