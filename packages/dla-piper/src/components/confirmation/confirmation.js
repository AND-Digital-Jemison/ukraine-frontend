import { connect } from 'frontity';
import {
  MaxRestraintWrapper,
  PageHeader, 
  ContentBlockWrapper,
} from '../common';
import { Box, Typography, styled } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useSessionStorage } from '../../hooks/useSessionStorage';

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
  const [refugee] = useSessionStorage("au_who_are_you");

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
            {`${refugee.firstname}${confirmTitle}`}
          </Typography>
          <ReceivedNotification />
        </MaxRestraintWrapper>
      </PageHeader>
      <MaxRestraintWrapper>
        <Box sx={{
          padding: '20px',
          bgcolor: '#F8F8F8',
          marginBottom: '20px',
        }} >
          <Typography sx={{fontWeight: 600,}}>{confirmNextTitle}</Typography>
          <ContentBlockWrapper>
            <Html2React html={confirmNextInfo}/>
          </ContentBlockWrapper>
        </Box>
      </MaxRestraintWrapper>
      <MaxRestraintWrapper>
        <Typography sx={{fontWeight: 600,}}>{confirmDataTitle}</Typography>
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
      bgcolor: '#EAF9E599',
      alignItems: 'center',
    }} >
      <CheckCircleOutline sx={{
        fill: '#62B01E',
        height: '35px',
        width: '35px',
        }}/>
      <Typography
        sx={{ 
          color: 'textColor.main', 
          fontSize: '16px', 
          fontWeight: '700', 
          padding: '0px 0px 0px 20px', 
          margin: '0px 0px 0px 0px !important',
        }}>
        Your request has been received.
      </Typography>
    </Box>
  )
};