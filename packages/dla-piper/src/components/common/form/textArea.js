import { TextareaAutosize, Box } from '@mui/material';
import { Label } from '../';
import { useController } from 'react-hook-form';
import { HelperTextError } from '.';

const TextArea  = ({ name, control, label, width='100%', onChange }) => {
  
  const { field: { onChange: fieldOnChange, ...fieldOther }, fieldState: { error } } = useController({ name, control, onChange });

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
        style={{ resize: 'vertical', width, bgcolor: '#FFFFFF', padding: '5px' }}
        {...fieldOther}
        onChange={fieldOnChange}
        placeholder={'Optional'}
      />
      { error &&
        <HelperTextError message={error?.message} />
      }
    </Box>
  )
}

export default TextArea;
