export interface INextResponse<T> {
  message: string;
  response: T;
}

export interface IResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface IUser {
  id: number;
  email: string;
  password: null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponseType {
  user: IUser;
  token: string;
}

export type ISignUpPayload = {
  email: string;
  password: string;
  confirmPassword?: string;
};
