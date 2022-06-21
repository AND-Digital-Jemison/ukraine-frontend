import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import generateComponentId from "./generateComponentId";
import { useController } from 'react-hook-form';
import HelperTextError from './helperTextError';

const normaliseLabel = (label) => {
  return (
    label[0].toUpperCase() + label.slice(1).replace(/-/g, " ").replace("[]", "")
  );
};

const RadioButtonGroup = ({ name, control, defaultValue, label, options = [], ...props}) => {
  
  const { field: {onChange, ...fieldOther}, fieldState: { error } } = useController({ name, control, defaultValue, ...props });
  
  return (
    <FormControl>
      {label &&
        (<Typography
          sx={{
            fontWeight: "bold",
            color: "textColor.main",
          }}
        >
          {normaliseLabel(label)}
        </Typography>)
      }
      { error &&
        <HelperTextError message={error.message} />
      }
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
            key={option?.value}
            value={option?.value}
            control={<Radio />}
            label={option?.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
