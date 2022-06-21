import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../common";

const StyledButton = ({ margin, color, fontWeight, fontSize, width, minHeight, disabled, label, onClick, variant, submit }) => {
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
                    margin: margin ? margin : ''
                }}
                onClick={handleClick}
                disableRipple
                disabled={ disabled ? true : false}
                type={submit ? "submit" : "button"}
            >
                {label}
            </Button>
        </ThemeProvider>
    )
};

export default StyledButton;