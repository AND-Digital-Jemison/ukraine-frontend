import { Step, RadioButtonGroup } from "../common/form";
import { useForm } from 'react-hook-form';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useEffect, useMemo } from 'react';

const schema = {
    options: '',
    visaType: '',
}

const VisaStep = () => {
    
    const [value, setValue] = useSessionStorage('au_visa_step', schema);

    const { control, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return value;
        }, [value])
    })

    useEffect(() => {
        reset(value)
    }, [value])

    const onSubmit = data => {
        setValue(data);
        console.log('data test', data);
    }

    const optionsVisa = ["No, I don't have any visas for the UK", "Yes, I have a visa for the UK"];
    const optionsVisaType = ["Working visa", "Study visa", "Visitor visa", "Indefinite stay visa", "Transit through visa", "Permanent living visa", "Refugee visa", "Stateless person visa"];

    return (
        <Step label="Do you have any existing visas for the UK?">
            <form onSubmit={handleSubmit(onSubmit)}>
                <RadioButtonGroup options={optionsVisa} 
                    name='options'
                    control={control}/>
                <br/>
                {value.options === optionsVisa[1] &&
                    <RadioButtonGroup label="Which visa do you have?" 
                        options={optionsVisaType}
                        name='visaType'
                        control={control}/>
                }
                <input type="submit" value="Next" />
            </form>
        </Step>
    );
}

export default VisaStep;