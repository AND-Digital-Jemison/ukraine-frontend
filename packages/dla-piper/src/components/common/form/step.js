import { Box } from "@mui/material";
import { Label } from '../index';

const Step = ({ label, children }) => {
  return (
    <Box sx={{ display: 'block', flex: 1 }}>
      <Label fontSize={"16px"} fontWeight={600} >{ label }</Label>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 0 0 0' }}>
        { children }
      </Box>
    </Box>
  );
};

export default Step;
