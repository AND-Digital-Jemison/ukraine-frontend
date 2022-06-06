import { Typography, Box } from "@mui/material";
import { Label } from '../index';

const Step = ({ label, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Label>{label}</Label>
      {children}
    </Box>
  );
};

export default Step;
