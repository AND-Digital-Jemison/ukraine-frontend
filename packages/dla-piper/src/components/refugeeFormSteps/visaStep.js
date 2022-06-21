import { Step, RadioButtonGroup } from "../common/form";
import { useForm, useWatch } from "react-hook-form";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { StyledButton } from "../common";
import { useYupResolver } from "../../hooks";
import * as yup from "yup";

const optionsVisa = [
  { label: "No, I don't have a visa", value: "no" },
  { label: "Yes, I have a visa for the UK", value: "yes" },
];
export const optionsVisaType = [
    { label: "Working visa", value: "working_visa" }, 
    { label: "Study visa", value: "study_visa" },
    { label: "Settlement/Indefinate leave to remain visa", value: "settlement_indefinate_visa" },  
    { label: "Visitor visa", value: "visitor_visa" },
    { label: "Family visa", value: "family_visa" },  
    { label: "Refugee visa", value: "refugee_visa" },  
    { label: "Discretionary leave to remain visa", value: "discretionary_leave_visa" },  
    { label: "Permanent living visa", value: "permanent_living_visa" },
    { label: "Pre-settled status (EU) visa", value: "presettled_visa" },  
    { label: "British citizenship", value: "british_citizenship_visa" },  
    { label: "Other visa", value: "other_visa" },
  ];

const schema = {
  have_visa: '',
  visa_type: "",
};

const validationSchema = yup.object().shape({
  have_visa: yup.string().required('Please select an answer'),
  visa_type: yup
    .string()
    .when("have_visa", {
      is: optionsVisa[1].value,
      then: yup.string().required("Please select a visa type"),
    }),
});

const VisaStep = ({ onNext, onPrevious }) => {
  const [value, setValue] = useSessionStorage("au_visa_step", schema);
  const resolver = useYupResolver(validationSchema);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: useMemo(() => {
      return value;
    }, [value]),
  });

  useEffect(() => {
    reset(value);
  }, [value]);

  const hasVisa = useWatch({
    control,
    name: "have_visa",
  });

  const onSubmit = (data) => {
    setValue(data);

    if (!onNext) {
      return;
    }
    onNext();
  };

  const handlePrevious = () => {
    if (!onPrevious) {
      return;
    }
    onPrevious();
  };

  return (
    <Step label="Do you have an existing visa for the UK?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioButtonGroup
          options={optionsVisa}
          name="have_visa"
          control={control}
        />
        <br />
        {hasVisa === optionsVisa[1].value && (
          <RadioButtonGroup
            label="Which visa do you have?"
            options={optionsVisaType}
            name="visa_type"
            control={control}
          />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0 0 0",
          }}
        >
          <StyledButton
            label="Back"
            width={"115px"}
            variant="outlined"
            onClick={handlePrevious}
          />
          <StyledButton label="Next" width={"115px"} submit />
        </Box>
      </form>
    </Step>
  );
};

export default VisaStep;
