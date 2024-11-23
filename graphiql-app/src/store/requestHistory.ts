'use client';

import { store } from '@/store/localStorage';
import { RequestHistory, RestData, RestQuery } from '@/store/types';

const LOCAL_STORAGE_KEY = 'rss-nfs-request-history';
const LOCAL_STORAGE_ITEM_KEY = 'rss-nfs-item-history';

export const requestHistory = {
  setStory: (data: RestQuery): void => {
    let parsedData: RequestHistory = [];

    if (store.hasItem(LOCAL_STORAGE_KEY)) {
      const LocalStorageData = store.getItem(LOCAL_STORAGE_KEY);
      parsedData = JSON.parse(LocalStorageData!) as RequestHistory;
    }

    parsedData.push({ ...data, date: new Date().getTime().toString() });
    store.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
  },

  getStory: (): RequestHistory => {
    if (!store.hasItem(LOCAL_STORAGE_KEY)) {
      return [];
    }

    return JSON.parse(store.getItem(LOCAL_STORAGE_KEY)!) as RequestHistory;
  },

  getItemStory: (): RestData => {
    return JSON.parse(store.getItem(LOCAL_STORAGE_ITEM_KEY)!) as RestData;
  },

  removeItemStore: (): void => {
    store.removeItem(LOCAL_STORAGE_ITEM_KEY);
  },

  removeStore: (): void => {
    store.removeItem(LOCAL_STORAGE_KEY);
  },
};
