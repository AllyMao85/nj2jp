import { persistStore } from 'redux-persist';
import { reduxLocalForage } from './localForage';

const updateReducers = (store) => {
  const config = {
    storage: reduxLocalForage,
    blacklist: ['user', 'auth'],
    // whitelist: persistentStoreWhitelist,
    // transforms: [],
  };
  persistStore(store, config);
  // persistStore(store, config, () => {
    // store.getState();
    // store.dispatch(Actions.startup());
  // });
};
export default { updateReducers };
