interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface ISignInFormData {
  email: string;
  password: string;
}

interface IRestFullFormData {
  method: string;
  url: string;
  body?: string;
}

export type { ISignUpFormData, ISignInFormData, IRestFullFormData };
