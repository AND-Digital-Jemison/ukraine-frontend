import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import eng from "../../public/flags/eng.png";
import pol from "../../public/flags/pol.png";
import rus from "../../public/flags/rus.png";
import ukr from "../../public/flags/ukr.png";

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

  const getFlag = () => languages.find((language) => language.label === currentLanguage).src;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    handleClose();
  };

  return (
    <div>
      <img src={getFlag()} />
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {currentLanguage}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {languages.map((language) => {
          return (
            <MenuItem onClick={() => handleLanguageChange(language.label)}>
              <img src={language.src} />
              {language.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
