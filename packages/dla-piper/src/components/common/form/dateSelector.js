import { useState } from "react";
import { Box, TextField, FormControl, SvgIcon } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { Label } from "../";

const getReadOnlyStyles = (readOnly) =>
  readOnly ? { backgroundColor: "#c7c7c7", borderRadius: "4px" } : {};

const defaultFormat = "dd/MM/yyyy";

const DateSelector = ({
  label = "",
  width = 326,
  views = ["day", "month", "year"],
  displayFormat = defaultFormat,
  placeholder = defaultFormat,
  readOnly = false,
  defaultValue = "",
  icon,
  onChange,
}) => {
  const [value, setValue] = useState(null);

  const dateIcon = icon ? { OpenPickerIcon: icon } : {};

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <Label fontSize="14px">{label}</Label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat={displayFormat}
            views={views}
            value={defaultValue ? defaultValue : value}
            readOnly={readOnly}
            components={{ ...dateIcon }}
            onChange={(newValue) => {
              if (onChange) {
                onChange(format(newValue, defaultFormat));
              }
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder,
                }}
                sx={{
                  ...getReadOnlyStyles(readOnly),
                }}
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default DateSelector;
