import { useState } from "react";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";
import { Label } from '../';

const DropDownList = ({
  width = 326,
  label = "",
  placeholder = "Select",
  options = [],
  onChange,
}) => {
  const [currentOption, setCurrentOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setCurrentOption(value);
    if (!onChange) {
      return;
    }
    onChange(value);
  };

  const displayPlaceholderOrValue = () => {
    if (currentOption !== "") return currentOption;

    return <span style={{ color: "grey" }}>{placeholder}</span>;
  };

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
      <Label fontSize="14px">{ label }</Label>
        <Select
          id={`${label?.replace(/ /g, "-")}-select`}
          value={currentOption}
          displayEmpty
          renderValue={displayPlaceholderOrValue}
          onChange={handleChange}
        >
          {options.map((currentOption, key) => (
            <MenuItem key={key} value={currentOption}>
              {currentOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownList;
