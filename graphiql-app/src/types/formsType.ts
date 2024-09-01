interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface ISignInFormData {
  email: string;
  password: string;
}

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

export type { ISignUpFormData, ISignInFormData, IRestFullFormData, IHeader };
