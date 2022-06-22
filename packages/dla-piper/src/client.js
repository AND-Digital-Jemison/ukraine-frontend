import { Root } from './components';

export default {
  name: "my-first-theme",
  roots: {
    ukraine: Root
  },
  state: {
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
