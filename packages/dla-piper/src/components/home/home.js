import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import { Typography, List, ListItem, Box, Tabs, Tab } from "@mui/material";
import Link from "@frontity/components/link";
import { Error } from "@mui/icons-material";
import HeaderShape from "./headerShape";
import { StyledButton, InfoContainer, InfoItem, MaxRestraintWrapper, CtaHeader, ContentBlockWrapper} from "../common";

const Home = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  const {
    ctaTitle,
    ctaDescription,
    ctaInfoTitle,
    ctaInfoListItems,
    ctaRefugeeLabel,
    ctaRefugeeLink,
    ctaVolunteerLabel,
    nonUkTabContent,
    alreadyInUKTabContent,
  } = home.acf;

  useEffect(() => {
    console.log("home.acf", home.acf);
  }, []);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  return (
    <>
      <CtaHeader>
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

          <InfoContainer title={ctaInfoTitle}>
            {ctaInfoListItems.length > 0 &&
              ctaInfoListItems
                .split("<br />")
                .map((item, index) => (
                  <InfoItem li={item} key={`ctaLI-${index}`} />
                ))}
          </InfoContainer>

          <Box variant="div">
            <Link link={ctaRefugeeLink} style={{ textDecoration: "none" }}>
              <StyledButton
                color="buttonColor"
                fixedWidth
                label={ctaRefugeeLabel}
                width={{ mobile: "100%", tablet: "288px" }}
              />
            </Link>
            <Link link="#" style={{ textDecorationColor: "#005BBB" }}>
              <StyledButton fixedWidth variant="text" label={ctaVolunteerLabel} width={{ mobile: "100%", tablet: "288px" }} />
            </Link>
          </Box>
        </MaxRestraintWrapper>
      </CtaHeader>
      <HeaderShape />
      <MaxRestraintWrapper>
        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          TabIndicatorProps={{
            style: { background: "gold", height: "3px" },
          }}
          sx={{
            "& .MuiTab-textColorPrimary": { color: "#6D7175" },
            "& .Mui-selected": { color: "#444444 !important" },
          }}
        >
          <Tab label="I'm not in the UK" {...a11yProps(0)} disableRipple />
          <Tab label="I'm already in the UK" {...a11yProps(0)} disableRipple />
        </Tabs>

        <TabPanel value={currentTabIndex} index={0}>
          <ContentBlockWrapper>
            <Html2React html={nonUkTabContent} />
          </ContentBlockWrapper>
        </TabPanel>
        <TabPanel value={currentTabIndex} index={1}>
          <ContentBlockWrapper>
            <Html2React html={alreadyInUKTabContent} />
          </ContentBlockWrapper>
        </TabPanel>
      </MaxRestraintWrapper>
    </>
  );
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export default connect(Home);
