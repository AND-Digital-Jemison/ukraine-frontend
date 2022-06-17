import { connect } from "frontity";
import Link from "@frontity/components/link";
import { Box, Typography, Toolbar, AppBar } from "@mui/material";
import { LanguageDropdown } from "../common/index";

const Menu = ({ state }) => {
  const currentLanguage = state.theme.currentLanguage;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow:
          "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toolbar variant="dense" sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
          <Link link={`/home/${currentLanguage ?? 'en'}`} style={{ textDecoration: "none", display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "textColor.main",
              }}
            >
              Ukraine Advice Project UK
            </Typography>
          </Link>

          <LanguageDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default connect(Menu);
