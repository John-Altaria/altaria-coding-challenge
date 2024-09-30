/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Layout from "@/components/layout";
import toastTheme from "@/helpers/toastTheme";
import { useEventsEndpoints } from "@/hooks/useEventsEndpoints";
import { useCoordinatesStore } from "@/store/coordStore";
import { IUser } from "@/types/store-types";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { replace } = useRouter();
  const setCoord = useCoordinatesStore((state) => state.setCoordinates);
  const { fetchEvents, fetchEventTypes } = useEventsEndpoints();

  useEffect(() => {
    fetchEventTypes();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
        setCoord([position.coords.latitude, position.coords.longitude]);
        fetchEvents(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      });
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") as string);
    const user: IUser = storedUser.state;

    if (!user?.token || !user?.user?.id || !user?.user?.email) {
      toast.error("Login to continue", { ...toastTheme });
      replace("/");
    }
  }, []);

  return location ? (
    <Layout>{children}</Layout>
  ) : (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      Hang in there!
      <BarLoader />
    </Stack>
  );
};

export default DashboardLayout;
