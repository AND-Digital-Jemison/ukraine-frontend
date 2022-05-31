import { Root } from './components';
import radioButtonProcessor from './processors/radioButtonProcessor';

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
    }
  },
  actions: {
    theme: {
      setLanguage: ({ state }) => value => {
        state.theme.currentLanguage = value;
      }
    }
  },
  libraries: {
    html2react: {
      processors: [radioButtonProcessor]
    }
  }
};
