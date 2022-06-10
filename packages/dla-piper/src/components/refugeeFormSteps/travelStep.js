import { Step, RadioButtonGroup, FamilyMemberSelector } from "../common/form";
import { Box } from '@mui/material';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';
import { StyledButton } from '../common';

const schema = {
    travelingWith: '',
    familyMembers: [],
}

const options = ["Just me", "Me and my family"];

const TravelStep = ({ onNext, onPrevious }) => {

    const [value, setValue] = useSessionStorage('au_travel_step', schema);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            travelingWith: options[0],
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'familyMembers',
    });

    const travelingWith = useWatch({
        control,
        name: 'travelingWith',
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
                <RadioButtonGroup options={options}
                    name='travelingWith'
                    control={control}
                />
                {travelingWith === options[1] &&
                    <FamilyMemberSelector
                        control={control}
                        fields={fields}
                        append={append}
                        remove={remove}
                        update={update}
                    />
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

export default TravelStep;
