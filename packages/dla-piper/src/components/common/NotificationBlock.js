import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const NotificationBlock = ({ message, type }) => {

  const checkNotificationStyles = () => {
    switch (type) {
      case 'error':
        return {
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          bgcolor: '#FFF4F4',
          alignItems: 'center',
          borderRadius: '4px',
        }

      default: 
        return {
          display: 'flex',
          flexDirection: 'row',
          padding: '20px',
          bgcolor: '#EAF9E599',
          alignItems: 'center',
          borderRadius: '4px',
        }
      }
  }

  return (
    <Box sx={checkNotificationStyles()} >
      { type === 'error'
        ?  (<ErrorOutline sx={{
              fill: '#D82C0D',
              height: '35px',
              width: '35px',
            }}/>)
        : (<CheckCircleOutline sx={{
              fill: '#62B01E',
              height: '35px',
              width: '35px',
            }}/>)
      }
      <Typography
        sx={{ 
          color: 'textColor.main', 
          fontSize: '16px', 
          fontWeight: '700', 
          padding: '0px 0px 0px 20px', 
          margin: '0px 0px 0px 0px !important',
        }}>
        { message }
      </Typography>
    </Box>
  )
}

export default NotificationBlock;
