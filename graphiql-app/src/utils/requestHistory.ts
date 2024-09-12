'use client';

import { IHeader, IVariables } from '@/types/restFullType';
import { store } from '@/utils/localStorage';

const LOCAL_STORAGE_KEY = 'rss-nfs-request-history';

interface RestQuery {
  url: string;
  method: string;
  body?: {
    type?: string;
    value?: string;
  };
  headers?: IHeader[];
  variables?: IVariables[];
}

interface RestQueryData extends RestQuery {
  date: Date;
}

type RequestHistory = RestQueryData[];

export const requestHistory = {
  setStory: (data: RestQuery): void => {
    const date = new Date();
    let parsedData: RequestHistory = [];

    if (store.hasItem(LOCAL_STORAGE_KEY)) {
      const LocalStorageData = store.getItem(LOCAL_STORAGE_KEY);
      parsedData = JSON.parse(LocalStorageData!) as RequestHistory;
    }

    parsedData.push({ ...data, date });
    store.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsedData));
    console.log(parsedData);
  },

  getStory: (): RequestHistory => {
    if (!store.hasItem(LOCAL_STORAGE_KEY)) {
      return [];
    }

    return JSON.parse(store.getItem(LOCAL_STORAGE_KEY)!) as RequestHistory;
  },
};
