import { connect } from 'frontity';
import {
  MaxRestraintWrapper,
  PageHeader, 
  ContentBlockWrapper,
  NotificationBlock,
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
          <NotificationBlock 
            message={'Your request has been received.'}
          />
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
