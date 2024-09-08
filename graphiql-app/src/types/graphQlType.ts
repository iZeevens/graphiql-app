import { IHeader, IVariables } from './restFulgraphQlType';

interface IGraphiQlFormData {
  url: string;
  sdlUrl: string;
  headers: IHeader[];
  query?: string;
  variables: IVariables[];
}

export type { IGraphiQlFormData };
