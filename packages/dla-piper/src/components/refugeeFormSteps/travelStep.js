import { Step, RadioButtonGroup, FamilyMemberSelector } from "../common/form";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';

const schema = {
    travelParty: '',
    familyMembers: [ ],
}

const TravelStep = () => {
    
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
        console.log('data test', data);
    }
    
    const options = ["Just me", "Me and my family"];

    const handleFamilyMembersChange = members => {
        setTravelState(state => {
            return { ...state, familyMembers: members };
        });
    }

    return (
        <Step label="Who are you traveling with?">
            <form onSubmit={handleSubmit(onSubmit)}>
                <RadioButtonGroup options={options}
                    name='travelParty'
                    control={control}/>
                {value.travelParty === options[1] &&
                    // <FamilyMemberSelector onChange={handleFamilyMembersChange} />
                    <p>test</p>
                }
                <input type="submit" value="Next" />
            </form>
        </Step>
    );
}

export default TravelStep;
