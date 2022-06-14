import { Root } from './components';
// import radioButtonProcessor from './processors/radioButtonProcessor';
// import { WhoAreYouProcessor } from './processors';

export default {
  name: "my-first-theme",
  roots: {
    ukraine: Root
  },
  state: {
    ukraine: {},
    source: {
      gfAuth: {
        key: process.env.GF_KEY,
        secret: process.env.GF_SECRET,
      }
    }
  },
  state: {
    theme: {
      currentLanguage: 'en',
    },
    source: {
      homepage: '/home/en',
    }
  },
  actions: {
    theme: {
      setLanguage: ({ state }) => value => {
        state.theme.currentLanguage = value;
      }
    }
  },
};
