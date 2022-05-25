import React from "react";
import { connect } from "frontity";

const Home = ({ state }) => {
  const data = state.source.get(state.router.link);
  const home = state.source[data.type][data.id];

  const { ctaTitle, ctaDescription, ctaInfoTitle, ctaInfoListItems, 
    ctaRefugeeLabel, ctaVolunteerLabel } = home.acf;
  console.log("home", home);

  return (
    <>
      <h1>{ctaTitle}</h1>
      <p>{ctaDescription}</p>
      <div>
        <h3>{ctaInfoTitle}</h3>
        <ul>
          {ctaInfoListItems.split('\\n').map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
      <button>{ctaRefugeeLabel}</button>
      <a href="#" >{ctaVolunteerLabel}</a>
    </>
  );
};

export default connect(Home);
