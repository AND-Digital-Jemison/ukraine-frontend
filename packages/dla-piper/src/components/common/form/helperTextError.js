import { Box, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

const HelperTextError = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '5px 0' }}>
      <Error sx={{ fill: '#D72C0D' }} />
      <Typography
        variant='p'
        sx={{
          color: '#D72C0D',
          fontWeight: 400,
          fontSize: '14px',
          margin: '0 0 0 10px'
        }}
      >
        { message }
      </Typography>
    </Box>
  )
};

export default HelperTextError;
