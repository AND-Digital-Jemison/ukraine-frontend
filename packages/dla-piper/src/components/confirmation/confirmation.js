import { connect } from 'frontity';
import {
  MaxRestraintWrapper,
  PageHeader, 
  ContentBlockWrapper,
} from '../common';
import { Box, Typography, styled } from '@mui/material';
import { DoneSharp } from '@mui/icons-material';

const Confirmation = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const confirmation = state.source[data.type][data.id];
  const {
    confirmTitle,
    confirmNextTitle,
    confirmNextInfo,
    confirmDataTitle,
    confirmDataInfo,
  } = confirmation.acf;

  const Html2React = libraries.html2react.Component;

  return (
    <>
      <PageHeader>
        <MaxRestraintWrapper>
          <Typography
            variant="h1"
            color="textColor.main"
            sx={{
              fontWeight: 600,
              fontSize: "42px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              margin: "0 0 20px 0",
            }}
          >
            {confirmTitle}
          </Typography>
          <ReceivedNotification />
        </MaxRestraintWrapper>
      </PageHeader>
      <MaxRestraintWrapper>
        <Box sx={{
          padding: '20px',
          bgcolor: '#F8F8F8'
        }} >
          <Typography>{confirmNextTitle}</Typography>
          <ContentBlockWrapper>
            <Html2React html={confirmNextInfo}/>
          </ContentBlockWrapper>
        </Box>
      </MaxRestraintWrapper>
      <MaxRestraintWrapper>
        <Typography>{confirmDataTitle}</Typography>
        <ContentBlockWrapper>
          <Html2React html={confirmDataInfo}/>
        </ContentBlockWrapper>
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