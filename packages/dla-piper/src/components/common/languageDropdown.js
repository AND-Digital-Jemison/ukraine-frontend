import { useState, useEffect } from "react";
import { Fade, Menu, Box, Typography } from "@mui/material";
import StyledMenuItem from "./styledMenuItem";
import { styled } from "@mui/system";
import { ArrowDropDown } from "@mui/icons-material";
import { connect } from "frontity";
import en from "flag-icons/flags/1x1/gb.svg";
import pl from "flag-icons/flags/1x1/pl.svg";
import ru from "flag-icons/flags/1x1/ru.svg";
import uk from "flag-icons/flags/1x1/ua.svg";

const languages = [
  { src: en, label: "ENG", iso639: "en" },
  { src: pl, label: "POL", iso639: "pl" },
  { src: ru, label: "RUS", iso639: "ru" },
  { src: uk, label: "UKR", iso639: "uk" },
];

const LanguageDropdown = ({ state, actions }) => {
  const { source, router, theme } = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const currentLanguage = theme.currentLanguage;
  const setCurrentLanguage = actions.theme.setLanguage;

  const matchCurrentLanguage = (link, route) => {
    if (link.match(`/${route}/[a-z]{2}`)) {
      const urlSplit = link.split('/');
      const lang = link.split('/')[2];
      
      if (!languages.map(l => l.iso639).includes(lang)) {
        return;
      }
      
      const urlParts = urlSplit.map(urlPart => (urlPart === lang) ? currentLanguage : urlPart)
      if (lang !== currentLanguage) {
        actions.router.set(urlParts.join('/'));
      }
    }
  }
  
  useEffect(() => {
    const link = router.link;

    matchCurrentLanguage(link, 'home');
    matchCurrentLanguage(link, 'refugee-form');
    matchCurrentLanguage(link, 'confirmation');
    matchCurrentLanguage(link, 'faq');
  }, [currentLanguage]);

  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getFlag = () =>
    languages.find((language) => language.iso639 === currentLanguage)?.src;

  const handleLanguageChange = (iso639) => {
    setCurrentLanguage(iso639); // setCurrentLanguage is defined in the root index.js of this /src (built into frontity)
    handleMenuClose();
    sessionStorage.setItem('client_lang', iso639);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <MenuButton onClick={handleMenuOpen}>
        <img
          src={getFlag()}
          style={{
            height: "24px",
            border: "solid #FFF 3px",
            borderRadius: "100%",
          }}
        />
        <p style={{ fontSize: "14px" }}>
          {languages.find((lang) => lang.iso639 === currentLanguage)?.label}
        </p>
        <ArrowDropDown fill={"#5C5F62"} />
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
          "& .MuiPaper-root": {
            borderRadius: "8px",
            border: "none",
            padding: "0 8px",
            minWidth: "166px",
          },
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontStyle: "italic",
            color: "#6D7175",
            fontSize: "12px",
            margin: "8px 2px",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Select a language
        </Typography>
        {languages.map((language) => {
          return (
            <StyledMenuItem
              {...language}
              onClick={() => handleLanguageChange(language.iso639)}
              key={language.iso639}
            />
          );
        })}
      </Menu>
    </Box>
  );
};

const MenuButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  flexDirection: "row",
  color: `#444444`,
  padding: "8px",

  "& p": {
    padding: "0 0 0 8px",
  },
});
export default connect(LanguageDropdown);
