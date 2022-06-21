import {
  Box,
  TextField,
} from "@mui/material";
import { Label } from '../';
import { HelperTextError } from '.';
import { useController } from 'react-hook-form';

const InputField = ({ name, control, defaultValue, label = "No Label", width = 326, ...props }) => {

  const { field, fieldState: { error } } = useController({ name, control, defaultValue, ...props });

  return (
    <Box
      component="div"
      sx={{
        m: 1,
        width,
        flex: 1,
        margin: 0
      }}
    >
      <Label fontSize="14px">{label}</Label>
      <TextField
        {...field}
        sx={error
          ? { width: width, border: '#D82C0D 1px solid', borderRadius: '4px', bgcolor: '#FFF4F4' }
          : { width: width, bgcolor: '#FFFFFF' }
        }
      />
      { error &&
        <HelperTextError message={error.message} />
      }
    </Box>
  );
};

export default InputField;




// function Input(props) {
//   const { field, fieldState } = useController(props);

//   return (
//     <div>
//       <input {...field} placeholder={props.name} />
//       <p>{fieldState.isTouched && "Touched"}</p>
//       <p>{fieldState.isDirty && "Dirty"}</p>
//       <p>{fieldState.invalid ? "invalid" : "valid"}</p>
//     </div>
//   );
// }