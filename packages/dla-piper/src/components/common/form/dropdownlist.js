import { useState } from "react";
import { Box, MenuItem, FormControl, Select, FormLabel } from "@mui/material";

const DropDownList = ({ width = 326, label, options }) => {
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const displayPlaceholderValue = () => {
    if (option !== "") return undefined;
    
    return <span style={{ color: 'grey' }}>Select</span>;
  }

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <FormLabel id="demo-simple-select-label">{label}</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          displayEmpty
          renderValue={displayPlaceholderValue}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownList;
