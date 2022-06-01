import { useState } from "react";
import { Box, MenuItem, FormControl, Select, FormLabel } from "@mui/material";

const DropDownList = ({
  width = 326,
  label,
  placeholder = "Select",
  options = [],
}) => {
  const [option, setOption] = useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const displayPlaceholderOrValue = () => {
    if (option !== "") return option;

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
          value={option}
          displayEmpty
          renderValue={displayPlaceholderOrValue}
          onChange={handleChange}
        >
          {options.map((option, key) => (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownList;
