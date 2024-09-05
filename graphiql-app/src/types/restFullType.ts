import { Control, FieldErrors } from 'react-hook-form';

interface IHeader {
  key: string;
  value: string;
}

interface IVariables {
  name: string;
  value: string;
}

interface IRestFullFormData {
  method: string;
  url: string;
  headers?: IHeader[];
  variables?: IVariables[];
  body?: string;
}

interface IHeadersRestfull {
  control: Control<IRestFullFormData>;
  urlChanged: () => void;
  errors: FieldErrors<IRestFullFormData>;
}

interface IVariablesFormData {
  control: Control<IRestFullFormData>;
}

export type {
  IRestFullFormData,
  IHeadersRestfull,
  IVariablesFormData,
  IHeader,
};
