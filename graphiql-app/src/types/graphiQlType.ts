import { IHeader, IVariables } from './restFullType';

interface IGraphiQlFormData {
  url: string;
  sdlUrl: string;
  headers: IHeader[];
  queary?: string;
  variables: IVariables[];
}

export type { IGraphiQlFormData };
