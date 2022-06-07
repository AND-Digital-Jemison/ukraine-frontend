import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../common";

const StyledButton = ({ color, fontWeight, fontSize, width, minHeight, label, onClick, variant }) => {
    const defaultTheme = createTheme(theme);
    const handleClick = () => {
        if (!onClick) {
            return;
        }
        onClick();
    }
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Button
                bgcolor={ color ? color : "primary" }
                variant={ variant ? variant : "contained" }
                sx={{  
                    width: width ? width : "auto",                 
                    fontWeight: fontWeight ? fontWeight : 400,
                    fontSize: fontSize ? fontSize : "15px",
                    minHeight: minHeight ? minHeight : "44px",
                    textAlign: "center",
                }}
                onClick={handleClick}
                disableRipple
            >
                {label}
            </Button>
        </ThemeProvider>
    )
};

export default StyledButton;