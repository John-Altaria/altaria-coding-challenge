/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Layout from "@/components/layout";
import toastTheme from "@/helpers/toastTheme";
import { useCoordinatesStore } from "@/store/coordStore";
import { IUser } from "@/types/store-types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const { replace } = useRouter();
  const setCoord = useCoordinatesStore((state) => state.setCoordinates);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position);
        setCoord([position.coords.latitude, position.coords.longitude]);
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

  return location ? <Layout>{children}</Layout> : null;
};

export default DashboardLayout;
