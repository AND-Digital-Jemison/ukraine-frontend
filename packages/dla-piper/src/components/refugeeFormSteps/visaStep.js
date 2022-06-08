import { Step, RadioButtonGroup } from "../common/form";
import { useState } from "react";

const VisaStep = () => {
    const optionsVisa = ["No, I don't have any visas for the UK", "Yes, I have a visa for the UK"];
    const optionsVisaType = ["Working visa", "Study visa", "Visitor visa", "Indefinite stay visa", "Transit through visa", "Permanent living visa", "Refugee visa", "Stateless person visa"];

    const [visaState, setVisaState] = useState({
        option: optionsVisa[0],
        visaType: null,
    });

    const handleHasVisaChange = option => {
        setVisaState(state => {
            return{...state, option: option}
        })
    }

    const handleVisaTypeChange = option => {
        setVisaState(state => {
            return{...state, visaType: option}
        })
    }

    return (
        <Step label="Do you have any existing visas for the UK?">
            <RadioButtonGroup options={optionsVisa} onChange={handleHasVisaChange}/>
            <br/>
            {visaState.option === optionsVisa[1] &&
                <RadioButtonGroup label="Which visa do you have?" options={optionsVisaType} onChange={handleVisaTypeChange}/>
            }
        </Step>
    );
}

export default VisaStep;