import { Control, FieldErrors } from 'react-hook-form';

interface IHeader {
  key: string;
  value: string;
}

interface IRestFullFormData {
  method: string;
  url: string;
  headers?: IHeader[];
  body?: string;
}

interface IHeadersRestfull {
  control: Control<IRestFullFormData>;
  errors: FieldErrors<IRestFullFormData>;
}

export type { IRestFullFormData, IHeadersRestfull, IHeader };
