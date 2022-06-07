import { Typography } from "@mui/material";

const Label = ({ fontSize, fontWeight, color, children }) => {
  return (
    <Typography
      sx={{
        fontWeight: fontWeight ? fontWeight : "normal",
        fontSize: fontSize ? fontSize : '1rem',
        color: color ? color : "textColor.main",
      }}
    >
      {children}
    </Typography>
  );
};

export default Label;
