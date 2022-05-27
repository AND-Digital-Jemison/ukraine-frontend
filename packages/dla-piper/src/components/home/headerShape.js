import { styled } from "frontity";
import React, { Component } from "react";

const HeaderShape = () => {
  return (
    <HeaderShapeStyle>
      <svg
        width="1024"
        height="31"
        viewBox="0 0 1024 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 31L0 0H1024L512 31Z" fill="#F8F8F8" />
      </svg>
    </HeaderShapeStyle>
  );
};

const HeaderShapeStyle = styled.div`
    svg {
        width: 100vw;
        height: 50px;
    }
`

export default HeaderShape;
