import { useState } from "react";
import { Box, MenuItem, FormControl, Select, Typography } from "@mui/material";

const DropDownList = ({
  width = 326,
  label = "",
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

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "textColor.main",
          }}
        >
          {label}
        </Typography>
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
