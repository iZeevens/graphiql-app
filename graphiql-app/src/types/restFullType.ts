import { FieldErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form';

import { IRestFullFormData } from './formsType';

interface IHeader {
  key: string;
  value: string;
}

interface IHeadersRestfull {
  headers: IHeader[];
  errors: FieldErrors<IRestFullFormData>;
  setHeaders: (arg: IHeader[] | ((prevVal: IHeader[]) => IHeader[])) => void;
  setValue: UseFormSetValue<IRestFullFormData>;
  setError: UseFormSetError<IRestFullFormData>;
}

export type { IHeadersRestfull, IHeader };
