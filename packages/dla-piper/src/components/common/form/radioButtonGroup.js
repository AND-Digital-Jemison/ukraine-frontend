import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography
} from "@mui/material";

const normaliseLabel = (label) => {
  return (
    label[0].toUpperCase() + label.slice(1).replace(/-/g, " ").replace("[]", "")
  );
};

const RadioButtonsGroup = ({ label = "No Label", options = [] }) => {
  const id = `${label.replace(/ /g, "-")}-radio-button-group`;
  
  return (
    <FormControl>
      <Typography
        sx={{
          fontWeight: 'bold',
          color: "textColor.main",
        }}
      >
        {normaliseLabel(label)}
      </Typography>
      <RadioGroup aria-labelledby={id} name="radio-buttons-group">
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;
