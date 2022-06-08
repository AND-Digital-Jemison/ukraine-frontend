import { TextareaAutosize, Box, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { Label } from '../';

const TextArea  = ({ label, width, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(value);
  }, [value])

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
        <TextareaAutosize
          minRows={5}
          style={{ resize: 'vertical' }}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  )
}

export default TextArea;
