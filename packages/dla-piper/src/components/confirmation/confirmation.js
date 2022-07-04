import { useEffect } from 'react';
import { connect } from "frontity";
import Link from "@frontity/components/link";
import {
  MaxRestraintWrapper,
  PageHeader,
  ContentBlockWrapper,
  NotificationBlock,
  StyledButton,
} from "../common";
import { Box, Typography, styled } from "@mui/material";
import { useSessionStorage } from "../../hooks/useSessionStorage";

const Confirmation = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const confirmation = state.source[data.type][data.id];
  const currentLanguage = state.theme.currentLanguage;

  const {
    confirmTitle,
    confirmSuccessMessage,
    confirmNextTitle,
    confirmNextInfo,
    confirmDataTitle,
    confirmDataInfo,
    comfirmGoToHomeLink,
    comfirmGoToHomeLabel,
  } = confirmation.acf;

  const Html2React = libraries.html2react.Component;
  const [refugee] = useSessionStorage("au_who_are_you");
  
  useEffect(() => {
    const isFormCompleted = sessionStorage.getItem('isFormCompleted');
    if (!isFormCompleted) {
      actions.router.set(`/refugee-form/en/`)
    } 
  },[])


  const clearFormData = () => {
    window.sessionStorage.removeItem('au_who_are_you')
    window.sessionStorage.removeItem('au_travel_step')
    window.sessionStorage.removeItem('au_visa_step')
    window.sessionStorage.removeItem('au_family_in_uk')
    window.sessionStorage.removeItem('au_summary')
    window.sessionStorage.removeItem('au_additional')
    window.sessionStorage.removeItem('isFormCompleted')
    window.sessionStorage.removeItem('currentStep')
  }

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
          <NotificationBlock message={confirmSuccessMessage} />
        </MaxRestraintWrapper>
      </PageHeader>
      <MaxRestraintWrapper>
        <Box
          sx={{
            padding: "20px",
            bgcolor: "#F8F8F8",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{confirmNextTitle}</Typography>
          <ContentBlockWrapper>
            <Html2React html={confirmNextInfo} />
          </ContentBlockWrapper>
        </Box>
      </MaxRestraintWrapper>
      <MaxRestraintWrapper>
        <Typography sx={{ fontWeight: 600 }}>{confirmDataTitle}</Typography>
        <ContentBlockWrapper>
          <Html2React html={confirmDataInfo} />
          <Link
            link={`${comfirmGoToHomeLink}/${currentLanguage}`}
            style={{ textDecoration: "none" }}
          >
            <StyledButton
              color="buttonColor"
              variant="outlined"
              label={comfirmGoToHomeLabel}
              margin="25px 0"
              onClick={clearFormData}
            />
          </Link>
        </ContentBlockWrapper>
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(Confirmation);
