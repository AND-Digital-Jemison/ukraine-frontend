import { useState } from "react";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";
import { Label } from '../';
import { useController } from 'react-hook-form';

const DropDownList = ({
  name,
  control,
  defaultValue,
  width = '100%',
  label = "",
  placeholder = "Select",
  options = [],
  ...props
}) => {
  const { field: {onChange, ...fieldOther}, fieldState } = useController({ name, control, defaultValue, ...props });

  return (
    <Box sx={{ width }}>
      <Label fontSize="14px">{ label }</Label>
        <Select
          id={`${label?.replace(/ /g, "-")}-select`}
          name={name}
          displayEmpty
          onChange={onChange}
          {...fieldOther}
          sx={{
            width
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} 
              value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
    </Box>
  );
};

export default DropDownList;
