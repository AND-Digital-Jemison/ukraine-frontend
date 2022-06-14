import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import generateComponentId from "./generateComponentId";
import { useController } from 'react-hook-form';

const normaliseLabel = (label) => {
  return (
    label[0].toUpperCase() + label.slice(1).replace(/-/g, " ").replace("[]", "")
  );
};

const RadioButtonGroup = ({ name, control, defaultValue, label, options = [], ...props}) => {
  
  const { field: {onChange, ...fieldOther}, fieldState: { errors } } = useController({ name, control, defaultValue, ...props });
  
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
        name={name}
        sx={{
          fontWeight: "normal",
          fontSize: "14px"
        }}
        onChange={onChange}
        {...fieldOther}
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
      { errors && errors.message }
    </FormControl>
  );
};

export default RadioButtonGroup;
