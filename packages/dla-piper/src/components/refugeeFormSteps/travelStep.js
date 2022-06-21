import { Step, RadioButtonGroup, FamilyMemberSelector } from "../common/form";
import { Box } from '@mui/material';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect } from 'react';
import { StyledButton } from '../common';
import { useYupResolver } from '../../hooks';
import * as yup from 'yup';

const options = [
    { label: "Just me", value: 'alone' }, 
    { label: "Me and my family", value: 'with_family' }
];

const schema = {
    traveling_with: '',
    family_members: [],
}

const validationSchema = yup.object().shape({
    traveling_with: yup.string().required('Please select an answer'),
    family_members: yup.array().of(yup.object().shape({
            relation: yup.string().required('Please select a relation'),
    })).when(
        'traveling_with', { is:options[1].value, then: yup.array().min(1, 'Must have at least one family member')
    })
});

const TravelStep = ({ onNext, onPrevious }) => {

    const [value, setValue] = useSessionStorage('au_travel_step', schema);

    const resolver = useYupResolver(validationSchema);
    const { control, handleSubmit, reset , formState: { errors } } = useForm({
        resolver,
        defaultValues: {
            traveling_with: '',
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'family_members',
    });

    const travelingWith = useWatch({
        control,
        name: 'traveling_with',
    })

    useEffect(() => {
        reset(value)
    }, [value])

    const onSubmit = data => {
        setValue(data);
        if (!onNext) {
            return;
        }
        onNext();
    }
    const handlePrevious = () => {
        if (!onPrevious) {
            return;
        }
        onPrevious();
    }


    return (
        <Step label="Who are you traveling with?">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <RadioButtonGroup options={options}
                        name='traveling_with'
                        control={control}
                    />
                    {travelingWith === options[1].value &&
                        <FamilyMemberSelector
                            control={control}
                            fields={fields}
                            append={append}
                            remove={remove}
                            update={update}
                            error={errors['family_members']}
                        />
                    }
                </Box>

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

export default TravelStep;
