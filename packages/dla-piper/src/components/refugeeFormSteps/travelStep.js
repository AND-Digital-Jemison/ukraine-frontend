import { Step, RadioButtonGroup} from "../common/form";
// import { Box } from '@mui/material';

const TravelStep = () => {
    return (
        <Step label="Who are you travelling with?">
            <RadioButtonGroup options={["Just me","Me and my family"]}/>
        </Step>
    );
}

export default TravelStep;
