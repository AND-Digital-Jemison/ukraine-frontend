import { useState } from "react";
import { Box, MenuItem, FormControl, Select, FormLabel } from "@mui/material";

const DropDownList = ({
  width = 326,
  label = "No Label",
  placeholder = "Select",
  options = [],
}) => {
  const [currentOption, sestCurrentOption] = useState("");

  const handleChange = (event) => {
    sestCurrentOption(event.target.value);
  };

  const displayPlaceholderOrValue = () => {
    if (currentOption !== "") return currentOption;

    return <span style={{ color: "grey" }}>{placeholder}</span>;
  };

  const id = `${label.replace(/ /g, "-")}-select`;

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <FormLabel id={`${id}-label`}>{label}</FormLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
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
