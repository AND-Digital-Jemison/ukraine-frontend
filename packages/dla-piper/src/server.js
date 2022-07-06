import { config } from 'dotenv';
import { Root } from './components';

config();

export default {
  name: "my-first-theme",
  roots: {
    ukraine: Root
  },
  state: {
    env: {
      LEGAL_CONNECTION_URL: process.env.LEGAL_CONNECTION_URL,
      WORDPRESS_SOURCE_URL: process.env.WORDPRESS_SOURCE_URL,
      LOG_API_URL: process.env.LOG_API_URL,
      RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
      RECAPTCHA_API: process.env.RECAPTCHA_API,
    },
    theme: {
      currentLanguage: 'en',
      currentTitle: 'Ukraine Advice Project UK'
    },
    source: {
      homepage: '/home/en',
    }
  },
  actions: {
    theme: {
      setLanguage: ({ state }) => value => {
        state.theme.currentLanguage = value;
      },
      setCurrentTitle: ({ state }) => value => {
        state.theme.currentTitle = value;
      },
      beforeSSR: async ({ actions }) => {
        await actions.source.fetch(`/formbuttonlabels/en/`);
        await actions.source.fetch(`/formbuttonlabels/pl/`);
        await actions.source.fetch(`/formbuttonlabels/ru/`);
        await actions.source.fetch(`/formbuttonlabels/uk/`);
        await actions.source.fetch(`/errorpage/en`);
        await actions.source.fetch(`/errorpage/pl`);
        await actions.source.fetch(`/errorpage/ru`);
        await actions.source.fetch(`/errorpage/uk`);
      }
    }
  },
};

