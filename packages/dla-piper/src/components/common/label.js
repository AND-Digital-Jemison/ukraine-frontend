import { Typography } from "@mui/material";

const Label = ({ children }) => {
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        color: "textColor.main",
      }}
    >
      {children}
    </Typography>
  );
};

export default Label;
