import { Control, FieldErrors } from 'react-hook-form';

import { IGraphiQlFormData } from './graphiQlType';

interface IHeader {
  key: string;
  value: string;
}

interface IVariables {
  name: string;
  value: string;
}

type ControlType = Control<IRestFullFormData> | Control<IGraphiQlFormData>;
type FieldType =
  | FieldErrors<IRestFullFormData>
  | FieldErrors<IGraphiQlFormData>;

interface IRestFullFormData {
  method: string;
  url: string;
  headers?: IHeader[];
  variables?: IVariables[];
  body?: string;
}

interface IHeadersRestfull {
  control: ControlType;
  urlChanged?: () => void;
  errors: FieldType;
}

interface IVariablesFormData {
  control: ControlType;
}

export type {
  IRestFullFormData,
  IHeadersRestfull,
  IVariablesFormData,
  IVariables,
  IHeader,
};
