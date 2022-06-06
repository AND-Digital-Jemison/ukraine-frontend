import {
  Typography,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import generateComponentId from "./generateComponentId";

const Input = ({
  label = "No Label",
  width = 326,
  multiline = false,
  rows = 1,
}) => {
  return (
    <Box
      component="form"
      sx={{
        m: 1,
        width,
      }}
    >
      <FormControl fullWidth>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "textColor.main",
          }}
        >
          {label}
        </Typography>
        <TextField
          id={generateComponentId(label, "text-field")}
          name="textField"
          variant="outlined"
          multiline={multiline}
          rows={rows}
        />
      </FormControl>
    </Box>
  );
};

export default Input;
