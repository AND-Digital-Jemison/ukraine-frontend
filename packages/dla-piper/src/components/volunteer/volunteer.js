import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import { Typography } from "@mui/material";
import {
  MaxRestraintWrapper,
  ContentBlockWrapper,
  InfoContainer,
  InfoItem,
  PageHeader,
  StyledButton,
} from "../common";

const Volunteer = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const volunteer = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;
  const currentLanguage = state.theme.currentLanguage;

  const {
    volunteerTitle,
    volunteerDescription,
    volunteerInfoTitle,
    volunteerInfoListItems,
    volunteerSupportContent,
    volunteerRequiredContent,
    volunteerNoteContent,
    volunteerBackButtonLabel,
    volunteerBackButtonLink,
  } = volunteer.acf;

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
            {volunteerTitle}
          </Typography>
          <ContentBlockWrapper>
            <Html2React html={volunteerDescription} />
          </ContentBlockWrapper>
          <InfoContainer title={volunteerInfoTitle}>
            {volunteerInfoListItems.length > 0 &&
              volunteerInfoListItems
                .split("<br />")
                .map((item, index) => (
                  <InfoItem li={item} key={`ctaLI-${index}`} />
                ))}
          </InfoContainer>
          <VolunteerSupportContentWrapper>
            <Html2React html={volunteerSupportContent} />
          </VolunteerSupportContentWrapper>
          <ContentBlockWrapper>
            <Html2React html={volunteerRequiredContent} />
          </ContentBlockWrapper>
          <VolunteerNoteContentWrapper>
            <Html2React html={volunteerNoteContent} />
          </VolunteerNoteContentWrapper>
          <Link
            link={`${volunteerBackButtonLink}/${currentLanguage}`}
            style={{ textDecoration: "none" }}
          >
            <StyledButton
              color="buttonColor"
              variant="outlined"
              label={volunteerBackButtonLabel}
              margin="28px 0"
              width={{ mobile: "100%", tablet: "125px" }}
            />
          </Link>
        </MaxRestraintWrapper>
      </PageHeader>
    </>
  );
};

const VolunteerSupportContentWrapper = styled.div`
  p {
    color: #444444;
    font-size: 18px;
    line-height: 26px;
  }
`;

const VolunteerNoteContentWrapper = styled.div`
  h4 {
    color: #333333;
    margin-bottom: -5px;
    line-height: 1.6em;
  }
  p {
    color: #444444;
    line-height: 26px;
    font-size: 14px;
  }
`;

export default connect(Volunteer);
