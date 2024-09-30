import axios, { AxiosError } from "axios";
import { useCoordinatesStore } from "@/store/coordStore";
import { authStore } from "@/store/userStore";
import {
  IEventsPayload,
  IEventsResponseTypes,
  IEventTypesResponseTypes,
  INextResponse,
  IResponse,
} from "@/types/api";
import { useEventsStore } from "@/store/eventsStore";
import toast from "react-hot-toast";
import toastTheme from "@/helpers/toastTheme";

export const useEventsEndpoints = () => {
  const coords = useCoordinatesStore.getState().coordinates;
  const token = authStore.getState().token;
  const setEvents = useEventsStore.getState().setEvents;
  const setEventTypes = useEventsStore.getState().setEventTypes;

  const fetchEvents = async (coord?: string) => {
    if (!token) return;
    try {
      const response = await axios.get(`/api/event`, {
        params: { coord: coord || coords.join(",") },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const events: INextResponse<IResponse<IEventsResponseTypes[]>> =
        response.data;
      setEvents(events.response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err?.response?.data?.message || "An error occurred!", {
        ...toastTheme,
      });
    }
  };

  const fetchEventTypes = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`/api/event/types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const eventTypes: INextResponse<IResponse<IEventTypesResponseTypes[]>> =
        response.data;

      setEventTypes(eventTypes.response.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(err?.response?.data?.message || "An error occurred!", {
        ...toastTheme,
      });
    }
  };

  const addEvent = async (
    data: IEventsPayload,
    callback: (status: boolean) => void
  ) => {
    if (!token) return;
    toast.promise(
      axios.post(`/api/event`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        loading: "Adding event...",
        success: () => {
          if (callback) {
            callback(true);
          }
          return "Event added successfully!";
        },
        error: (error) => {
          const err: AxiosError<{ message: string }> = error;
          if (callback) {
            callback(false);
          }
          return err?.response?.data?.message || "An error occurred!";
        },
      },
      { ...toastTheme }
    );
  };

  const bookmarkEvent = async (
    eventId: number,
    callback: (status: boolean) => void
  ) => {
    if (!token) return;
    toast.promise(
      axios.post(
        `/api/event/bookmark`,
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        loading: "Bookmarking event...",
        success: () => {
          if (callback) {
            callback(true);
          }
          return "Event bookmarked successfully!";
        },
        error: (error) => {
          const err: AxiosError<{ message: string }> = error;
          if (callback) {
            callback(false);
          }
          return err?.response?.data?.message || "An error occurred!";
        },
      },
      { ...toastTheme }
    );
  };

  return { fetchEvents, fetchEventTypes, addEvent, bookmarkEvent };
};
