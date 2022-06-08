import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import generateComponentId from "./generateComponentId";

const normaliseLabel = (label) => {
  return (
    label[0].toUpperCase() + label.slice(1).replace(/-/g, " ").replace("[]", "")
  );
};

const RadioButtonGroup = ({ label, options = [], onChange }) => {
  
  const handleChange = (event) => {
    if (!onChange) return;
    onChange(event.target.value);
  };
  
  return (
    <FormControl>
      {label &&
        <Typography
          sx={{
            fontWeight: "bold",
            color: "textColor.main",
          }}
        >
          {normaliseLabel(label)}
        </Typography>}
      <RadioGroup
        id={generateComponentId(label, "radio-buttons-group")}
        name="radio-buttons-group"
        sx={{
          fontWeight: "normal",
          fontSize: "14px"
        }}
        onChange={handleChange}
      >
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

export default RadioButtonGroup;
