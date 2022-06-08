import { useState } from "react";
import { Box, TextField, FormControl } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { Label } from "../";

const DateSelector = ({
  label = "",
  width = 326,
  views = ["day", "month", "year"],
  displayFormat = "dd/MM/yyyy",
  placeholder = "dd/MM/yyyy",
  setDate,
}) => {
  const [value, setValue] = useState(null);

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <Label fontSize="14px">{label}</Label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat={displayFormat}
            views={views}
            value={value}
            onChange={(newValue) => {
              setDate(format(newValue, displayFormat));
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ ...params.inputProps, placeholder }}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default DateSelector;
