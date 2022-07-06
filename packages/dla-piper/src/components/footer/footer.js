import { styled, Box } from '@mui/material';
import { MaxRestraintWrapper } from '../common';

const Footer = () => {

  return (
    <FooterWrapper>
      <MaxRestraintWrapper>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            desktop: '1fr 1fr 1fr',
            tablet: '1fr 1fr',
            mobile: '1fr',
          },
        }}>
          <p>col</p>
          <p>col</p>
          <p>col</p>
        </Box>
      </MaxRestraintWrapper>
    </FooterWrapper>
  )
};

const FooterWrapper = styled('footer')({
  backgroundColor: '#F8F8F8',
  padding: '48px 0 96px 0',

});

export default Footer;