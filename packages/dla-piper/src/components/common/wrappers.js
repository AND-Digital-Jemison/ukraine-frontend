import { styled } from "frontity";

export const MaxRestraintWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const CtaHeader = styled.div`
  padding: 20px 0;
  width: 100vw;
  background-color: #f8f8f8;
`;

export const PageHeader = styled.div`
  padding: 20px 0;
  width: 100vw;
`;

export const ErrorPageWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    padding: 120px 0px 50px 0px;
  }
  p {
    padding: 0px 0px 50px 0px;
  }
`;

export const ContentBlockWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #333333;
    margin: 5px 0;
    line-height: 1.6em;
  }
  p {
    color: #444444;
    font-size: 16px;
    line-height: 26px;
  }
  a {
    color: #2c6ecb;
  }
  br{
    margin-bottom:20px;
    display: block;
    line-height: 20px;
    content: " ";
  }
  ul {
    margin-left: 25px;
    margin-bottom: 20px;
    color: #444444;
  }
  li {
    padding: 2px;
  }
`;