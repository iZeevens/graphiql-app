'use client';

export const store = {
  hasItem: (key: string): boolean => {
    return Boolean(localStorage.getItem(key));
  },

  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  setItem: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  },
};
