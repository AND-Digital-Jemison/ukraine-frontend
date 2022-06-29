import { useEffect } from 'react';
import { connect, Global, css, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import {
  List,
  Post,
  Page,
  Menu,
  Home,
  RefugeeForm,
  Confirmation,
  Volunteer,
  NotFound
} from "..";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../common";

const Root = ({ state, actions }) => {
  const { source, router } = state;
  const data = source.get(router.link);
  const defaultTheme = createTheme(theme);
  const currentLanguage = state.theme.currentLanguage;

  useEffect(() => {
    if(router.link === root) {
      actions.router.set(`/home/${currentLanguage}`);
    }
  }, [currentLanguage])

  const checkForClientLanguage = () => {
    const excisingClientLang = sessionStorage.getItem('client_lang');
    
    if (excisingClientLang) {
      actions.theme.setLanguage(excisingClientLang);
    }
  };

  useEffect(() => {
    checkForClientLanguage();

  }, [ ])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Global styles={globalStyles} />
      <header>
        <Head>
          <title>{state.theme.currentTitle}</title>
          <meta property="og:site_name" content="Ukraine Advice Project UK" />
          <meta property="og:title" content="Free UK immigration advice for people fleeing Ukraine"/>
          <meta property="og:description" content="We are providing a free service to connect Ukrainian citizens (and others fleeing Ukraine) with free legal advice on UK immigration, visas and asylum from qualified and regulated lawyers."/>
          <meta property="og:image" content="https://i0.wp.com/adviceukraine.wpcomstaging.com/wp-content/uploads/2022/06/Group-68.png?ssl=1&resize=554%2C554"/>
        </Head>
        <Menu />
      </header>
      <Main>
        <Switch>
          <List when={data.isArchive} />
          <Post when={data.isPost} />
          <Page when={data.isPage} />
          <Home when={data.isHome} />
          <RefugeeForm when={data.isRefugeeForm} />
          <Confirmation when={data.isConfirmation} />
          <Volunteer when={data.isVolunteer} />
          <NotFound when={data.isError} />
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
