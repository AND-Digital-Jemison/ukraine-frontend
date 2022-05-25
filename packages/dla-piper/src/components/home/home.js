import React from "react";
import { connect } from "frontity";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];

  const { ctaTitle, ctaDescription, ctaInfo, 
    ctaRefugeeLabel, ctaVolunteerLabel, nonUkTabContent } = home.acf;
  console.log("home.acf", home.acf);

  return (
    <>
      <h1>{ctaTitle}</h1>
      <p>{ctaDescription}</p>
      <div dangerouslySetInnerHTML={{__html: ctaInfo}} />
      <button>{ctaRefugeeLabel}</button>
      <a href="#" >{ctaVolunteerLabel}</a>
      <div dangerouslySetInnerHTML={{__html: nonUkTabContent}} />
      
    </>
  );
};

export default connect(Home);
