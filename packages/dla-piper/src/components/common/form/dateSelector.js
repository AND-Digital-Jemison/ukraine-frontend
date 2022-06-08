import { useState } from "react";
import { Box, TextField, FormControl, SvgIcon } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { Label } from "../";
import UpDownArrowIcon from "../../../public/icons/upDownArrowIcon";

const getReadOnlyStyles = (readOnly) =>
  readOnly ? { backgroundColor: "#c7c7c7", borderRadius: "4px" } : {};

const DateSelector = ({
  label = "",
  width = 326,
  views = ["day", "month", "year"],
  displayFormat = "dd/MM/yyyy",
  valueFormat = "dd/M/yyyy",
  placeholder = "dd/MM/yyyy",
  readOnly = false,
  defaultValue = "",
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
            value={defaultValue ? defaultValue : value}
            readOnly={readOnly}
            components={{ OpenPickerIcon: UpDownArrowIcon }}
            onChange={(newValue) => {
              if (setDate) {
                setDate(format(newValue, valueFormat));
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
