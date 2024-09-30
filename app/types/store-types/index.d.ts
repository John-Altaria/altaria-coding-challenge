import {
  IEventsResponseTypes,
  IEventTypesResponseTypes,
  IUserResponseType,
} from "../api";

type IUser = IUserResponseType;
type IEvents = IEventsResponseTypes;
type IEventTypes = IEventTypesResponseTypes;

export interface IUserStore {
  user: IUser["user"] | null;
  token: IUser["token"] | null;
  setUser: (user: IUser["user"]) => void;
  setSession: (session: IUser) => void;
  setToken: (token: IUser["token"]) => void;
  clearUser: () => void;
}

export interface IEventsStore {
  events: IEvents[];
  eventTypes: IEventTypes[];
  setEvents: (events: IEvents[]) => void;
  setEventTypes: (eventTypes: IEventTypes[]) => void;
}

export interface ICoordinatesStore {
  coordinates: [number, number];
  currentCoords: [number, number] | null;
  setCoordinates: (coord: [number, number]) => void;
  setCurrentCoords: (currentCoords: [number, number]) => void;
}
