import { TextareaAutosize, Box } from '@mui/material';
import { Label } from '../';
import { useController } from 'react-hook-form';

const TextArea  = ({ name, control, label, width='100%', onChange }) => {
  
  const { field: { onChange: fieldOnChange, ...fieldOther }, fieldState } = useController({ name, control, onChange });

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
      <Label fontSize="14px">{ label }</Label>
      <TextareaAutosize
        minRows={5}
        style={{ resize: 'vertical', width }}
        {...fieldOther}
        onChange={fieldOnChange}
      />
    </Box>
  )
}

export default TextArea;
