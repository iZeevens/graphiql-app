import { store } from '@/store/localStorage';
import { RestQuery } from '@/store/types';

const LOCAL_STORAGE_KEY = 'rss-nfs-item-history';

export const itemHistory = {
  setItem: (data: RestQuery): void => {
    store.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  },

  getStory: (): RestQuery => {
    return JSON.parse(store.getItem(LOCAL_STORAGE_KEY)!) as RestQuery;
  },

  removeStore: (): void => {
    store.removeItem(LOCAL_STORAGE_KEY);
  },
};
