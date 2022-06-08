import { Step, RadioButtonGroup } from "../common/form";
import { useState } from "react";

const FamilyStep = () => {
    const optionsFamily = ["No, I don't have a family member in the UK", "Yes, I have a family member in the UK"];
    const optionsFamilyType = ["British citizen", "Settled in the UK (also...)"];

    const [familyState, setFamilyState] = useState({
        option: optionsFamily[0],
        familyType: null,
    });

    const handleHasFamilyChange = option => {
        setFamilyState(state => {
            return{...state, option: option};
        })
    }

    const handleFamilyTypeChange = option => {
        setFamilyState(state => {
            return{...state, familyType: option};
        })
    }

    return (
        <Step label="Do you have any existing visas for the UK?">
            <RadioButtonGroup options={optionsFamily} onChange={handleHasFamilyChange}/>
            <br/>
            {familyState.option === optionsFamily[1] &&
                <RadioButtonGroup label="Which of the following best describes your UK based family member?" options={optionsFamilyType} onChange={handleFamilyTypeChange}/>
            }
        </Step>
    );
}

export default FamilyStep;