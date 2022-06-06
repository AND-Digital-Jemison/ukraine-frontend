import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#C1C1C1',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: 'buttonColor.main',
  },
}));


const CustomizedProgressBar = ({ progressPercent }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: '10px 0' }}>
      <BorderLinearProgress variant="determinate" value={progressPercent} />
    </Box>
  );
}

export default CustomizedProgressBar;
