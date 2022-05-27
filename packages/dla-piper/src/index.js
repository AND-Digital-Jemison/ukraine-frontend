import { Root } from './components';

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
  actions: {
    ukraine: {}
  }
};
