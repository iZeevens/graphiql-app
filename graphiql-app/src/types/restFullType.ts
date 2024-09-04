import { Control, FieldErrors } from 'react-hook-form';

import { IRestFullFormData } from '@/types/formsType';

interface IHeader {
  key: string;
  value: string;
}

interface IHeadersRestfull {
  control: Control<IRestFullFormData>;
  errors: FieldErrors<IRestFullFormData>;
  // setHeaders: (arg: IHeader[] | ((prevVal: IHeader[]) => IHeader[])) => void;
  // setValue: UseFormSetValue<IRestFullFormData>;
  // setError: UseFormSetError<IRestFullFormData>;
}

export type { IHeadersRestfull, IHeader };
