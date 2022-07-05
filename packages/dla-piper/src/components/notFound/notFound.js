import { Box, Typography } from '@mui/material';
import { connect } from 'frontity';
import React, { useState, useEffect } from "react";
import { StyledButton } from '../common';
import Link from "@frontity/components/link";

const NotFound = ({ state, libraries }) => {
  const currentLanguage = state.theme.currentLanguage;
  const Html2React = libraries.html2react.Component;

  const getNotFoundLanguage = () => {
    console.log(state);
    const data = state.source.get(`/errorpage/${currentLanguage}/`);
    const errorPage = state.source[data.type][data.id];

    return errorPage.acf
  }

  const [errorInfoState, setErrorInfoState] = useState({errorPageMessage:"", errorPageReturnButton:"Back"});

  useEffect(()=>{
    setErrorInfoState(getNotFoundLanguage());
  },[currentLanguage])
  
  return (
    <>
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant="h1" 
        sx={{ 
          fontSize: "36px", 
          fontWeight: "bold",
          color: 'textColor.main',
          padding: '30px 0'
        }}
        >
        <Html2React html={errorInfoState.errorPageMessage}/>
      </Typography>
      </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <Link link={`/home/${currentLanguage}/`} style={{ textDecoration: "none" }}>
            <StyledButton
              label={errorInfoState.errorPageReturnButton}
              width={'125px'}
              variant="outlined"
            />
          </Link>
        </Box>
    
    </>
  )
};

export default connect(NotFound);
