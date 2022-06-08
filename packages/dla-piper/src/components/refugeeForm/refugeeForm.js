import React, { useEffect } from "react";
import { connect } from "frontity";
import { Typography } from "@mui/material";
import {
  InfoContainer,
  InfoItem,
  MaxRestraintWrapper,
  PageHeader,
} from "../common";
import { Stepper } from "../common/form";
import { WhoAreYouStep, TravelStep, VisaStep, FamilyStep} from "../refugeeFormSteps";

const RefugeeForm = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const refugeeForm = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  const {
    rfTitle,
    rfDescription,
    rfInfoTitle,
    rfInfoListItems,
    rfWhoAreYouLabel,
  } = refugeeForm.acf;

  useEffect(() => {
    console.log("refugeeForm.acf", refugeeForm.acf);
  }, []);

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
            {rfTitle}
          </Typography>
          <Typography
            paragraph
            color="textColor.main"
            sx={{
              fontWeight: 400,
              fontSize: "15px",
            }}
          >
            {rfDescription}
          </Typography>

          {rfInfoListItems && (
            <InfoContainer title={rfInfoTitle}>
              {rfInfoListItems.length > 0 &&
                rfInfoListItems
                  .split("<br />")
                  .map((item, index) => (
                    <InfoItem li={item} key={`rfLI-${index}`} />
                  ))}
            </InfoContainer>
          )}
        </MaxRestraintWrapper>
      </PageHeader>
      <MaxRestraintWrapper>
        <Stepper steps={[
          <WhoAreYouStep />,
          <TravelStep />,
          <VisaStep />,
          <FamilyStep />,
          ]} />
      </MaxRestraintWrapper>
    </>
  );
};

export default connect(RefugeeForm);
