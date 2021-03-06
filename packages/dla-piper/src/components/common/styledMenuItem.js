import { MenuItem } from '@mui/material';

const StyledMenuItem = ({ src, label, onClick }) => {

  const handleClick = () => {
    if (!onClick) return;
    onClick(label);
  }

  return (
    <MenuItem onClick={handleClick}
      sx={{
        display: 'flex',
        gap: '10px',
        borderRadius: '8px',
        minHeight: '40px',
        padding: '8px',
      }}
      disableRipple
    >
      <img 
        src={src} 
        style={{ height: '24px', border: 'solid #FFF 3px', borderRadius: '100%' }}
      />
      <p style={{ fontSize: '14px' }} >{ label }</p>
    </MenuItem>
  );
};

export default StyledMenuItem;
