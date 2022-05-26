import React from "react";
import { connect, styled } from "frontity";
import { Typography, Stack, Button, List, ListItem, Box, Grid } from "@mui/material";
import Link from "@frontity/components/link";
import { Error } from '@mui/icons-material';

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];
  const {
    ctaTitle,
    ctaDescription,
    ctaInfoTitle,
    ctaInfoListItems,
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
          margin: '0 0 20px 0',
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
      <Box variant='div'
        sx={{
          border: '1px solid',
          borderColor: 'infoColors.border',
          bgcolor: 'infoColors.background',
          borderRadius: '8px',
          padding: '16px',
          margin: '0 0 20px 0',
        }}
      >
        <Typography 
          variant='h3'
          sx={{
            fontWeight: 600,
            fontSize: '16px',
            margin: 0,
            padding: 0,
            color: 'textColor.main',
          }}
        >
          {ctaInfoTitle}
        </Typography>
        <List sx={{ padding: '0' }}>
          {ctaInfoListItems.length > 0 &&
            ctaInfoListItems.split('<br />').map((item, index) => (
              <ThemedListItem li={item} key={`ctaLI-${index}`} />
            )
          )}
        </List>
      </Box>
      <Box variant='div'>
        <Link link="#" style={{ textDecoration: "none" }}>
          <Button
            color="buttonColor"
            variant="contained"
            sx={{
              fontWeight: 400,
              fontSize: "15px",
              fontFamily: "Plus Jakarta Sans",
              minWidth: "288px",
              minHeight: "44px",
            }}
          >
            {ctaRefugeeLabel}
          </Button>
        </Link>
        <Link link="#">
          <Button 
            variant="text"
            sx={{
              minWidth: "288px",
              minHeight: "44px",
            }}
          >{ctaVolunteerLabel}</Button>
        </Link>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: nonUkTabContent }} />
    </>
  );
};

const ThemedListItem = ({ li }) => (
  <ListItem 
    sx={{ 
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      paddingLeft: '8px',
      fontSize: '14px' 
    }}
  >
    <Error color='infoIconColor' sx={{ alignSelf: 'flex-start' }} />
    {li}
  </ListItem>
);

export default connect(Home);
