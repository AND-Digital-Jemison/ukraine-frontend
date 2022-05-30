import { useState } from "react";
import { Fade, Menu, Box, Typography } from "@mui/material";
import StyledMenuItem from './styledMenuItem';
import eng from "../../public/flags/eng.png";
import pol from "../../public/flags/pol.png";
import rus from "../../public/flags/rus.png";
import ukr from "../../public/flags/ukr.png";
import { styled } from '@mui/system';
import { ArrowDropDown } from "@mui/icons-material"
 
const languages = [
  { src: eng, label: "ENG" },
  { src: pol, label: "POL" },
  { src: rus, label: "RUS" },
  { src: ukr, label: "UKR" },
];

const LanguageDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("ENG");

  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getFlag = () => languages.find((language) => language.label === currentLanguage).src;
  
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MenuButton
        onClick={handleMenuOpen}
      >
        <img src={getFlag()} />
        <p style={{ fontSize: '14px' }} >{ currentLanguage }</p>
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
            <StyledMenuItem {...language} onClick={handleLanguageChange} />
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

export default LanguageDropdown;
