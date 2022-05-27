import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../common";

const StyledButton = ({ color, filled, fontWeight, fontSize, fixedWidth, minHeight, label }) => {
    const defaultTheme = createTheme(theme);
    
    return (
        <ThemeProvider theme={defaultTheme}>
        <Button
            color={ color ? color : "primary" }
            variant={ filled ? "contained" : "text" }
            sx={{
                fontWeight: fontWeight ? fontWeight : 400,
                fontSize: fontSize ? fontSize : "15px",
                minWidth: fixedWidth ? {
                    mobile: "100%",
                    tablet: "288px",
                } : {},
                minHeight: minHeight ? minHeight : "44px",
            }}
        >
            {label}
        </Button>
        </ThemeProvider>
    )
};

export default StyledButton;