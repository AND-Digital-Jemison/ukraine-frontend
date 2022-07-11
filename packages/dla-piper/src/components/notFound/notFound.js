import { Box } from '@mui/material';
import { connect } from 'frontity';
import { useState, useEffect } from "react";
import { StyledButton, ErrorPageWrapper, MaxRestraintWrapper } from '../common';
import Link from "@frontity/components/link";

const NotFound = ({ state, libraries }) => {
  const [loading, setLoading] = useState(true);
  const [errorInfoState, setErrorInfoState] = useState({errorPageMessage:"", errorPageReturnButton:""});
  const currentLanguage = state.theme.currentLanguage;
  const Html2React = libraries.html2react.Component;

  const getNotFoundLanguage = () => {
    const data = state.source.get(`/errorpage/${currentLanguage}/`);
    const errorPage = state.source[data.type][data.id];

    setLoading(false);
    return errorPage.acf
  }

  useEffect(() => {
    setErrorInfoState(getNotFoundLanguage());
  },[currentLanguage])

  if (loading) {
    return <></>
  }
  
  return (
    <MaxRestraintWrapper>
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        <ErrorPageWrapper>
          <Html2React html={errorInfoState.errorPageMessage}/>
        </ErrorPageWrapper>
      </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <Link link={`/home/${currentLanguage}/`} style={{ textDecoration: "none" }}>
            <StyledButton
              label={errorInfoState.errorPageReturnButton}
              // variant="outlined"
              color="buttonColor"
              width={{ mobile: "100%", tablet: "288px" }}
            />
          </Link>
        </Box>
    </MaxRestraintWrapper>
  )
};

export default connect(NotFound);
