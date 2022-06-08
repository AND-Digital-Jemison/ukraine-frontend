import {
  Typography,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import generateComponentId from "./generateComponentId";
import { Label } from '../'

const InputField = ({
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
        flex: 1,
        margin: 0
      }}
    >
      <FormControl 
        fullWidth
        sx={{ margin: 0 }}
      >
        <Label fontSize="14px">{ label }</Label>
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

export default InputField;
