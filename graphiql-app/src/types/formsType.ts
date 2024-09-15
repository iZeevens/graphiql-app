interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface ISignInFormData {
  email: string;
  password: string;
}

export type { ISignUpFormData, ISignInFormData };
