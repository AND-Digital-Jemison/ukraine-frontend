import { InputField, DropDownList, Step } from "../common/form";
import { Box } from '@mui/material';

const WhoAreYouStep = () => {
  return (
    <Step label="Who are you?">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{ display: 'flex' }}>
          <InputField label="First name" />
          <InputField label="Last name" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '3px' }}>
            <DropDownList label="Date of birth" placeholder="dd" width={100} />
            <DropDownList  placeholder="mm" width={100} />
            <DropDownList  placeholder="yyyy" width={100} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <InputField label="Email" />
          </Box>
        </Box>
      </Box>
    </Step>
  );
};

export default WhoAreYouStep;
