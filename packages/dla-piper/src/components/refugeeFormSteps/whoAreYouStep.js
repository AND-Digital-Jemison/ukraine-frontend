import { InputField, DatePicker, Step } from "../common/form";
import { StyledButton } from '../common';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';
import Link from "@frontity/components/link";
import { format, toDate } from "date-fns";
import { useYupResolver } from '../../hooks';
import * as yup from 'yup';


// we are using this naming convention to follow the shape of the data
// that legal connection is expecting, yes we would like it to be 
// camelCase, but we can't always have what we want :( 
const schema = {
  firstname: '',
  lastname: '',
  date_of_birth: null,
  email: '',
}

const validationSchema = yup.object().shape({
  firstname: yup.string().max(64, 'cannot excide 64 characters').required('First name is required'),
  lastname: yup.string().max(64, 'cannot excide 64 characters').required('Last name is required'),
  date_of_birth: yup.date().required('Date of birth is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
})

const WhoAreYouStep = ({ onNext }) => {

  const [value, setValue] = useSessionStorage('au_who_are_you', schema);

  
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
    const payload = {
      ...data,
      date_of_birth: format(toDate(data.date_of_birth), 'yyyy/MM/dd')
    }
    setValue(payload);

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
            name='firstname'
            control={control}
            label="First name"
            width='100%'
          />
          <InputField
            name='lastname'
            control={control}
            label="Last name"
            width='100%'
          />
          <DatePicker
            name='date_of_birth'
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
          <Link link={'/home/en/'} style={{ textDecoration: "none" }}>
            <StyledButton
              label='Back'
              width={'115px'}
              variant="outlined"
            />
          </Link>
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
