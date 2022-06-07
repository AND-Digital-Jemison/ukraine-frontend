import { InputField, DropDownList, Step } from "../common/form";
import { Box } from '@mui/material';

const WhoAreYouStep = () => {
  return (
    <Step label="Who are you?">
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          mobile: '1fr',
          tablet: '1fr 1fr'
        },
        flex: 1,
        gap: '20px'
      }}>

        <InputField label="First name" width='100%' />
        <InputField label="Last name" width='100%' />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}>
          <DropDownList label="Date of birth" placeholder="dd" width='100%' />
          <DropDownList  placeholder="mm" width='100%' />
          <DropDownList  placeholder="yyyy" width='100%' />
        </Box>
        <InputField label="Email" width='100%'/>
      </Box>
    </Step>
  );
};

export default WhoAreYouStep;
