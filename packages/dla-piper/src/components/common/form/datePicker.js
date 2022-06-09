import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/';
import { TextField, Box } from '@mui/material';
import { Label } from '../../common';
import { useController } from 'react-hook-form';
import UpDownArrowIcon from '../../../public/icons/upDownArrowIcon';

const DatePicker = ({ name, control, label, width='100%', defaultValue, ...props }) => {

  // here we are accessing the regular react-hook-form controller
  // however we also need access to the on change function from field.onChange
  // so pull that out on its own
  const { field: { onChange, ...fieldOther }, fieldState } = useController({ name, control, defaultValue, ...props });

  return (
    <Box sx={{ width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Label fontSize="14px">{ label }</Label>
        <MuiDatePicker
          openTo="year"
          views={['year', 'month', 'day']}
          disableFuture
          onChange={onChange}
          {...fieldOther}
          renderInput={(params) => <TextField sx={{ width }} {...params} helperText={null} />}
          components={{ OpenPickerIcon: UpDownArrowIcon }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default DatePicker;
