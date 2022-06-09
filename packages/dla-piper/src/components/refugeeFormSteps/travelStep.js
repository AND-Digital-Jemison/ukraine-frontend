import { Step, RadioButtonGroup, FamilyMemberSelector } from "../common/form";
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';
import { StyledButton } from '../common';

const schema = {
    travelParty: '',
    familyMembers: [],
}

const TravelStep = ({ onNext, onPrevious }) => {

    const options = ["Just me", "Me and my family"];

    const [value, setValue] = useSessionStorage('au_travel_step', schema);
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
                    name='travelParty'
                    control={control} 
                />
                {value.travelParty === options[1] &&
                    // <FamilyMemberSelector onChange={handleFamilyMembersChange} />
                    <p>test</p>
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
