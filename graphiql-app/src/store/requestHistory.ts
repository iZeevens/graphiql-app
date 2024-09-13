'use client';

import { store } from '@/store/localStorage';
import { RestQuery } from '@/store/types';
import { RequestHistory } from '@/store/types';

const LOCAL_STORAGE_KEY = 'rss-nfs-request-history';

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

  removeStore: (): void => {
    store.removeItem(LOCAL_STORAGE_KEY);
  },
};
