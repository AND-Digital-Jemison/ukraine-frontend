import { Step, RadioButtonGroup} from "../common/form";
import { useState } from "react";
// import { Box } from '@mui/material';

const TravelStep = () => {
    const options = ["Just me","Me and my family"];
    
    const[travelState, setTravelState] = useState({
        option: options[0],
        familyMembers: [],
    });

    const handleRadioButtonChange = (event) => {
        setTravelState(state => {
            return {...state, option: event};
        });
    } 

    return (
        <Step label="Who are you travelling with?">
            <RadioButtonGroup options={options} onChange={handleRadioButtonChange}/>
            {travelState.option===options[1]&&
                <p>Test</p>
            }
        </Step>
    );
}

export default TravelStep;
