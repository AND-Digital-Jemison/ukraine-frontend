import { connect, Global, css, styled } from "frontity";
import Switch from "@frontity/components/switch";
import { List, Post, Page, Menu, Home } from "..";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../common";

const Root = ({ state }) => {
  const { source, router } = state;
  const data = source.get(router.link);

  const defaultTheme = createTheme(theme);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyles} />
      <header>
          <Menu />
      </header>
      <Main>
        <Switch>
          <List when={data.isArchive} />
          <Post when={data.isPost} />
          <Page when={data.isPage} />
          <Home when={data.isHome} />
        </Switch>
      </Main>
    </ThemeProvider>
  );
};

const Main = styled.main`
  margin: auto;
  img {
    max-width: 100%;
  }
  h2 {
    margin: 0.5em 0;
  }
  p {
    line-height: 1.25em;
    margin-bottom: 0.75em;
  }
  figcaption {
    color: #828282;
    font-size: 0.8em;
    margin-bottom: 1em;
  }
`;
const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Plus Jakarta Sans", sans-serif;
  }
  html {
    font-family: system-ui, Verdana, Arial, sans-serif;
  }
`;

export default connect(Root);
