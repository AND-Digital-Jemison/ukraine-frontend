import React from 'react';
import { connect } from 'frontity';

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];
  console.log('home', home);

  return (
    <div dangerouslySetInnerHTML={{ __html: home.content.rendered }} />
  );
}

export default connect(Home);
