import React from "react";
import { connect } from "frontity";
import { Typography, Stack, Button } from "@mui/material";
import Link from "@frontity/components/link";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];
  const {
    ctaTitle,
    ctaDescription,
    ctaInfo,
    ctaRefugeeLabel,
    ctaVolunteerLabel,
    nonUkTabContent,
  } = home.acf;

  console.log("home.acf", home.acf);

  return (
    <>
      <Typography
        variant="h1"
        color="textColor.main"
        sx={{
          fontWeight: 600,
          fontSize: "42px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {ctaTitle}
      </Typography>
      <Typography
        paragraph
        color="textColor.main"
        sx={{
          fontWeight: 400,
          fontSize: "15px",
        }}
      >
        {ctaDescription}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: ctaInfo }} />
      <Stack spacing={2} direction="row">
        <Link link="#" style={{ textDecoration: "none" }}>
          <Button
            color="buttonColor"
            variant="contained"
            sx={{
              fontWeight: 400,
              fontSize: "15px",
              fontFamily: "Plus Jakarta Sans",
              width: "288px",
              height: "44px",
            }}
          >
            {ctaRefugeeLabel}
          </Button>
        </Link>
        <Link link="#">
          <Button variant="text">{ctaVolunteerLabel}</Button>
        </Link>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: nonUkTabContent }} />
    </>
  );
};

export default connect(Home);
