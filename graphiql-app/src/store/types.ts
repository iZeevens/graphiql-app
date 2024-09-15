import { IHeader, IVariables } from '@/types/restFullType';

export interface RestQuery {
  type: 'rest' | 'graphiql';
  url: string;
  method: string;
  body?: {
    type?: string;
    value?: string;
  };
  headers?: IHeader[];
  variables?: IVariables[];
}

export interface RestData extends RestQuery {
  date: string;
}

export type RequestHistory = RestData[];
