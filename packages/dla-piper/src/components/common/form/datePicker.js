import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/';
import { TextField, Box } from '@mui/material';
import { useState } from 'react';
import { Label } from '../../common';
import { useController } from 'react-hook-form';

const DatePicker = ({ name, control, label }) => {
  const [value, setValue] = useState(new Date());

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Label fontSize="14px">{ label }</Label>
        <MuiDatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          disableFuture
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default DatePicker;
