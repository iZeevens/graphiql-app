import { Control, FieldErrors, FieldValues } from 'react-hook-form';

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

interface IHeadersFormData<T extends FieldValues> {
  control: Control<T>;
  urlChanged: () => void;
  errors: FieldErrors<T>;
}

interface IVariablesFormData<T extends FieldValues> {
  control: Control<T>;
}

export type {
  IRestFullFormData,
  IHeadersFormData,
  IVariablesFormData,
  IVariables,
  IHeader,
};
