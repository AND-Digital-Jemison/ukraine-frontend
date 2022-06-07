import { Step, RadioButtonGroup, FamilyMemberSelector } from "../common/form";
import { useState } from "react";

const TravelStep = () => {
    const options = ["Just me", "Me and my family"];

    const [travelState, setTravelState] = useState({
        option: options[0],
        familyMembers: [],
    });

    const handleRadioButtonChange = option => {
        setTravelState(state => {
            return { ...state, option: option };
        });
    }

    const handleFamilyMembersChange = members => {
        setTravelState(state => {
            return { ...state, familyMembers: members };
        });
    }

    return (
        <Step label="Who are you traveling with?">
            <RadioButtonGroup options={options} onChange={handleRadioButtonChange} />
            {travelState.option === options[1] &&
                <FamilyMemberSelector onChange={handleFamilyMembersChange} />
            }
        </Step>
    );
}

export default TravelStep;
