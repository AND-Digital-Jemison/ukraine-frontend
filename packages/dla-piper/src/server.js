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
      }
    }
  },
};

