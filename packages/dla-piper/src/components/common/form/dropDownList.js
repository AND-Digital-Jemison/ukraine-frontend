import { useState, useEffect } from "react";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";
import { Label } from '../';
import { useController, useWatch } from 'react-hook-form';
import HelperTextError from './helperTextError';

const DropDownList = ({
  name,
  control,
  defaultValue,
  width = '100%',
  label = "",
  placeholder = "Select",
  options = [],
  onChange: onChangeProp,
  ...props
}) => {
  const { field: {onChange, ...fieldOther}, fieldState: { error } } = useController({ name, control, defaultValue, ...props });

  const selectValue = useWatch({
    control,
    name: name,
  })

  const handleChange = e => {
    onChange(e);

    // used for any extra updates that need to be done
    if (onChangeProp) {
      onChangeProp(e);
    }
  }
    
  return (
    <Box sx={{ width }}>
      <Label fontSize="14px">{ label }</Label>
      <Select
        id={`${label?.replace(/ /g, "-")}-select`}
        name={name}
        displayEmpty
        onChange={handleChange}
        {...fieldOther}
        sx={error
          ? { width: width, border: '#D82C0D 1px solid', borderRadius: '4px', bgcolor: '#FFF4F4' }
          : { width: width }
        }
      >
        {options.map((option) => (
          <MenuItem key={option} 
            value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      { error &&
        <HelperTextError message={error?.message} />
      }
    </Box>
  );
};

export default DropDownList;
