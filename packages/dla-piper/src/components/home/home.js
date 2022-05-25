import React from "react";
import { connect } from "frontity";
import { Typography } from "@mui/material";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];

  const { ctaTitle, ctaDescription, ctaInfo,
    ctaRefugeeLabel, ctaVolunteerLabel, nonUkTabContent } = home.acf;
  console.log("home.acf", home.acf);

  return (
    <>
      <Typography
        variant='h1'
        color='textColor.main'
        sx={{
          fontWeight: 600,
          fontSize: '42px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
        {ctaTitle}
      </Typography>
      <Typography
        paragraph
        color='textColor.main'
        sx={{
          fontWeight: 400,
          fontSize: '15px',
        }}>
        {ctaDescription}
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: ctaInfo }} />
      <button>{ctaRefugeeLabel}</button>
      <a href="#" >{ctaVolunteerLabel}</a>
      <div dangerouslySetInnerHTML={{ __html: nonUkTabContent }} />
    </>
  );
};

export default connect(Home);
