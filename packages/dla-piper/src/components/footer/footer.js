import { styled, Box, Typography } from '@mui/material';
import Link from '@frontity/components/link';
import { connect } from 'frontity';

const Footer = ({ state }) => {

  const { currentLanguage } = state.theme;

  return (
    <FooterWrapper>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            desktop: '25fr 45fr 30fr',
            mobile: '1fr',
          },
          gap: '2rem',
        }}>
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant='h6'>
              Ukraine Advice Project
            </Typography>
            <Typography variant='p'>
              Powered by
            </Typography>
          </Box>

          <Box 
            sx={{
              display: 'flex',
              flexDirection: {
                desktop: 'row',
                mobile: 'column',
              },
              gap: '1rem',
              alignItems: 'center',
              justifyContent: {
                desktop: 'flex-start',
                mobile: 'center',
              }
            }}
          >
            <FooterLink link='https://www.dlapiper.com/' text='DLA Piper' type='external' />
            <FooterLink link='https://www.and.digital/about/' text='AND Digital' type='external' />
            <FooterLink link='https://www.legalconnection.co/' text='Legal Connection' type='external' />
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                desktop: 'row',
                mobile: 'column',
              },
              gap: '1rem',
              alignItems: 'center',
              justifyContent: {
                desktop: 'flex-start', 
                mobile: 'center',
              }
            }}
          >
            <FooterLink link={`/faq/${currentLanguage}`} text='FAQs' type='internal' />
          </Box>
        </Box>
    </FooterWrapper>
  )
};

const FooterWrapper = styled('footer')({
  backgroundColor: '#F8F8F8',
  padding: '10px 0 10px 0',

});

const FooterLink = ({ link, text, type }) => {
  return (
    <Link link={link}
      style={{
        textDecoration: type === 'external' ? 'underline': 'none',
        color: '#2C6ECB',
        padding: '0 10px',
      }}
    >
      <Typography variant='p'
        sx={{
          color: type === 'external' ? '#2C6ECB': '#202223',
        }}
      >
        { text }
      </Typography>
    </Link>
  )
}

export default connect(Footer);