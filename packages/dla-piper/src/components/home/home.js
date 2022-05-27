import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import {
  Typography,
  List,
  ListItem,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import Link from "@frontity/components/link";
import { Error } from "@mui/icons-material";
import HeaderShape from "./headerShape";
import { StyledButton } from "../common";

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

          <Box
            variant="div"
            sx={{
              border: "1px solid",
              borderColor: "infoColors.border",
              bgcolor: "infoColors.background",
              borderRadius: "8px",
              padding: "16px",
              margin: "0 0 20px 0",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                margin: 0,
                padding: 0,
                color: "textColor.main",
              }}
            >
              {ctaInfoTitle}
            </Typography>
            <List sx={{ padding: "0" }}>
              {ctaInfoListItems.length > 0 &&
                ctaInfoListItems
                  .split("<br />")
                  .map((item, index) => (
                    <ThemedListItem li={item} key={`ctaLI-${index}`} />
                  ))}
            </List>
          </Box>

          <Box variant="div">
            <Link link="#" style={{ textDecoration: "none" }}>
              <StyledButton
                color="buttonColor"
                filled
                fixedWidth
                label={ctaRefugeeLabel}
              />
            </Link>
            <Link link="#">
              <StyledButton
                fixedWidth
                label={ctaVolunteerLabel}
              />
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

const MaxRestraintWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CtaHeader = styled.div`
  padding: 20px 0;
  width: 100vw;
  background-color: #f8f8f8;
`;

const ContentBlockWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #333333;
    margin: 5px 0;
    line-height: 1.2em;
  }
  p {
    color: #444444;
    font-size: 14px;
  }
  a {
    color: #2C6ECB;
  }
`;

const ThemedListItem = ({ li }) => (
  <ListItem
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      paddingLeft: "8px",
      fontSize: "14px",
    }}
  >
    <Error color="infoIconColor" sx={{ alignSelf: "flex-start" }} />
    {li}
  </ListItem>
);

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
