import { connect, styled } from "frontity";
import Link from "@frontity/components/link";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LanguageDropdown } from "../common/index";
import eng from "../../public/flags/eng.png"; // Tell webpack this JS file uses this image

const Menu = () => {
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
          <Link link="/home/en" style={{ textDecoration: "none" }}>
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
