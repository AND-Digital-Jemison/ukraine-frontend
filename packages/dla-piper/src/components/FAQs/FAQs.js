import { Box, Typography } from '@mui/material';
import { connect } from 'frontity';
import { ContentBlockWrapper, MaxRestraintWrapper } from '../common';
import { useEffect } from 'react';

const FAQs = ({ state, libraries, actions }) => {
  const data = state.source.get(state.router.link);
  const faq = state.source[data.type][data.id];
  const setCurrentTitle = actions.theme.setCurrentTitle;
  const Html2React = libraries.html2react.Component;

  // grab data from wordpress ACF
  const { faqTitle, faqs } = faq.acf;

  // update the Title of the page
  useEffect(() => {
    setCurrentTitle(faqTitle);

  }, [faqTitle]);

  return (
    <MaxRestraintWrapper>
      <Typography variant='h1'
        sx={{
          fontSize: '42px',
          fontWeight: 600,
          color: 'textColor.main',
          padding: '20px 0',
        }}
      >
        { faqTitle }
      </Typography>
      <ContentBlockWrapper>
        <Box sx={{ padding: '20px 0' }}>
          <Html2React html={ faqs } />
        </Box>
      </ContentBlockWrapper>
    </MaxRestraintWrapper>
  )

};

export default connect(FAQs);
