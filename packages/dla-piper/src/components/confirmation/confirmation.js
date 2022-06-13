import { connect } from 'frontity';
import { MaxRestraintWrapper } from '../common';
import { Box, Typography } from '@mui/material';
import { DoneSharp } from '@mui/icons-material';

const Confirmation = ({ state }) => {
  const data = state.source.get(state.router.link);


  return (
    <>
      <MaxRestraintWrapper>
        <ReceivedNotification />

      </MaxRestraintWrapper>
    </>
  )
}

export default connect(Confirmation);


const ReceivedNotification = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
      bgcolor: '#EAF9E599'
    }} >
      <DoneSharp />
      <Typography
        sx={{ color: 'textColor.main', fontSize: '16px', fontWeight: '700' }}
      >
        Your request has been received.
      </Typography>
    </Box>
  )
};
