import { Box, Typography } from '@mui/material';
import { connect } from 'frontity';

const NotFound = () => {

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant="h1" 
        sx={{ 
          fontSize: "36px", 
          fontWeight: "bold",
          color: 'textColor.main',
          padding: '30px 0'
        }}
        >
        404 Not Found
      </Typography>
    </Box>
  )
};

export default connect(NotFound);
