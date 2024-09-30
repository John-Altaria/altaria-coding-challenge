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

export interface IEventsResponseTypes {
  id: number;
  creatorId: number;
  name: string;
  type: number;
  address: string;
  lat: number;
  lon: number;
  description: string;
  date: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  eventType: IEventTypesResponseTypes;
  bookmarkedByUsers: BookmarkedByUser[];
}

export interface BookmarkedByUser {
  id: number;
}

export interface IEventTypesResponseTypes {
  id: number;
  name: string;
}

export interface IEventsPayload {
  type: string;
  lat: number;
  lon: number;
  name: string;
  description: string;
  date: string;
  time: string;
}
