import { IUserResponseType } from "../api";

type IUser = IUserResponseType;

export interface IUserStore {
  user: IUser["user"] | null;
  token: IUser["token"] | null;
  setUser: (user: IUser["user"]) => void;
  setSession: (session: IUser) => void;
  setToken: (token: IUser["token"]) => void;
  clearUser: () => void;
}
