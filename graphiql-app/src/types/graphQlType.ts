import { IHeader } from './restFulgraphQlType';

interface IGraphiQlFormData {
  url: string;
  sdlUrl: string;
  headers?: IHeader[];
  query: string;
  variables?: string;
}

export type { IGraphiQlFormData };
