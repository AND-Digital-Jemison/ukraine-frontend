import { Step, RadioButtonGroup } from "../common/form";
import { useForm, useWatch } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { StyledButton } from '../common';
import { useYupResolver } from "../../hooks";
import * as yup from 'yup';

const optionsVisa = ["No, I don't have a visa", "Yes, I have a visa for the UK"];
const optionsVisaType = ["Working visa", "Study visa", "Visitor visa", "Indefinite stay visa", "Transit through visa", "Permanent living visa", "Refugee visa", "Stateless person visa"];

const schema = {
    have_visa: optionsVisa[0],
    visa_type: '',
}

const validationSchema = yup.object().shape({
    have_visa: yup.string().required(''),
    visa_type: yup.string().when(
        'have_visa', {is:optionsVisa[1], then: yup.string().required('Please select a visa type')}
    ),
})

const VisaStep = ({ onNext, onPrevious }) => {

    const [value, setValue] = useSessionStorage('au_visa_step', schema);
    const resolver = useYupResolver(validationSchema);
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        resolver,
        defaultValues: useMemo(() => {
            return value;
        }, [value])
    })

    useEffect(() => {
        reset(value)
    }, [value])

    const hasVisa = useWatch({ 
        control, 
        name: 'have_visa' 
    });

    const onSubmit = data => {
        setValue(data);

        if (!onNext) {
            return;
        };
        onNext();
    }

    const handlePrevious = () => {
        if (!onPrevious) {
            return;
        }
        onPrevious();
    }

    return (
        <Step label="Do you have an existing visa for the UK?">
            <form onSubmit={handleSubmit(onSubmit)}>
                <RadioButtonGroup options={optionsVisa}
                    name='have_visa'
                    control={control} />
                <br />
                {hasVisa === optionsVisa[1] &&
                    <RadioButtonGroup label="Which visa do you have?"
                        options={optionsVisaType}
                        name='visa_type'
                        control={control} />
                }

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
    );
}

export default VisaStep;