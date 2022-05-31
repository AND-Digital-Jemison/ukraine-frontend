import { useState } from "react";
import { Fade, Menu, Box, Typography } from "@mui/material";
import StyledMenuItem from './styledMenuItem';
import eng from "../../public/flags/eng.png";
import pol from "../../public/flags/pol.png";
import rus from "../../public/flags/rus.png";
import ukr from "../../public/flags/ukr.png";
import { styled } from '@mui/system';
import { ArrowDropDown } from "@mui/icons-material"
import { connect } from 'frontity';
 
const languages = [
  { src: eng, label: "ENG", iso639: "en" },
  { src: pol, label: "POL", iso639: "pl" },
  { src: rus, label: "RUS", iso639: "ru" },
  { src: ukr, label: "UKR", iso639: "uk" },
];

const LanguageDropdown = ({ state, actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentLanguage = state.theme.currentLanguage;
  const setCurrentLanguage = actions.theme.setLanguage;

  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getFlag = () => languages.find((language) => language.iso639 === currentLanguage).src;
  
  const handleLanguageChange = (iso639) => {
    setCurrentLanguage(iso639);  // setCurrentLanguage is defined in the root index.js of this /src (built into frontity)
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MenuButton
        onClick={handleMenuOpen}
      >
        <img src={getFlag()} />
        <p style={{ fontSize: '14px' }} >{ languages.find(lang => lang.iso639 === currentLanguage).label }</p>
        <ArrowDropDown fill={'#5C5F62'} />
      </MenuButton>
      
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            border: 'none',
            padding: '0 8px',
            minWidth: '166px'
          },
        }}
      >
        <Typography 
          variant='p'
          sx={{ fontStyle: 'italic', color: '#6D7175', fontSize: '12px', margin: '8px 2px', textTransform: 'uppercase', fontWeight: 400 }}
        >
          Select a language
        </Typography>
        {languages.map((language) => {
          return (
            <StyledMenuItem {...language} onClick={() => handleLanguageChange(language.iso639)} key={language.iso639} />
          );
        })}
      </Menu>
    </Box>
  );
};

const MenuButton = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  flexDirection: 'row',
  color: `#444444`,
  padding: '8px',
  
  '& p': {
    padding: '0 0 0 8px',
  }
})
;

export default connect(LanguageDropdown);
