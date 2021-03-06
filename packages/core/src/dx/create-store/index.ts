import { Action, Store } from 'redux';
import { store } from '../../helper/store';
import { storeModel } from './store-model';
import { combinStore } from './create-store';
import storePlugins from '../create-plugin';
import { CreateOption } from '../exports/create';

export function createStoreFactory() {
  return (options: CreateOption = {}): Store<{}, Action> => {
    // TODO: HMR
    if (store.reduxStore) return store.reduxStore;

    // 收集 plugins
    storePlugins(options.plugins);

    // 收集 model
    storeModel(options);

    // 生成 store
    const newStore = combinStore(options);
    store.reduxStore = newStore;
    return newStore;
  };
}
