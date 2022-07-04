import { useEffect } from 'react';
import { connect, styled } from 'frontity';
import Link from '@frontity/components/link';

const List = ({ state, actions }) => {
  const { router } = state;
  const currentLanguage = state.theme.currentLanguage;

  useEffect(() => {
    if (router.link.includes('volunteer')) {
      return actions.router.set(`/volunteer/en`);
    };

    actions.router.set(`/${router.link}/${currentLanguage}`);
  }, [])

  return <></>;
};

export default connect(List);
