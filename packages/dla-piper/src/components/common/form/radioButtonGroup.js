import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const RadioButtonsGroup = ({ label = "Radio Button", options = [] }) => {

  const id = `${label.replace(/ /g, '-')}-radio-button-group`;
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={id}
        name="radio-buttons-group"
      >
        {options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;