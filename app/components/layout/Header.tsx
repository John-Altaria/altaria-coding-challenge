"use client";

import { authStore } from "@/store/userStore";
import { Space_Grotesk } from "next/font/google";
import SVGClient from "../SVGClient";
import { Box, Drawer, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Card from "../Card";
import { useEventsStore } from "@/store/eventsStore";
import getDistance from "@/helpers/getUserDistance";
import { useCoordinatesStore } from "@/store/coordStore";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const Header = () => {
  const user = authStore((state) => state.user);
  const events = useEventsStore((state) => state.events);
  const coords = useCoordinatesStore((state) => state.coordinates);
  const [value, setValue] = useState("1");
  const [open, setopen] = useState(false);

  const userLat = coords[0];
  const userLon = coords[1];

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <header className="flex justify-between max-w-[95%] md:w-[90%] w-full py-[1rem] border-b mx-auto items-center">
        <h1 className={`m-0 text-[2.5rem] ${spaceGrotesk.className}`}>
          Map App
        </h1>
        <button
          onClick={() => {
            setopen(true);
          }}
          className="flex text-[1.5rem] gap-[.85rem] items-center"
        >
          <SVGClient
            style={{ width: "2rem", height: "2rem", color: "#000" }}
            src="/svg/filter.svg"
          />
          Filter
        </button>
        <span className="text-[1.5rem]">Hi {user?.email.split("@")[0]}</span>
      </header>

      {/* drawer  */}
      <Drawer open={open} onClose={() => setopen(false)}>
        <section className="md:w-[30vw] w-[95vw] border overflow-hidden h-[100vh] gap-[2rem] flex flex-col">
          <div className="flex text-[2.5rem] pt-[3rem] w-fit mx-auto items-center gap-[1rem]">
            <SVGClient
              style={{ width: "2.5rem", height: "2.5rem", color: "#000" }}
              src="/svg/filter.svg"
            />
            <h3 className={`m-0 p-0 ${spaceGrotesk.className}`}>Filter</h3>
          </div>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                height: "fit-content",
                width: "fit-content",
                marginInline: "auto",
                overflow: "auto",
                color: "#D2B48C",
              }}
            >
              <TabList
                sx={{
                  color: "brown",
                  "& .MuiTabs-indicator": { color: "brown", bgcolor: "brown" },
                }}
                scrollButtons="auto"
                textColor="inherit"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab sx={{ fontSize: "1rem" }} label="Most Recent" value="1" />
                <Tab
                  sx={{ fontSize: "1rem" }}
                  label="Closer To You"
                  value="2"
                />
                <Tab
                  sx={{ fontSize: "1rem" }}
                  label="Created By You"
                  value="3"
                />
              </TabList>
            </Box>
            <TabPanel
              sx={{
                flex: 1,
                overflow: "auto",
              }}
              value="1"
            >
              <Stack gap={"1rem"}>
                {events
                  ? events
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .map((event, index) => (
                        <Card
                          {...event}
                          isOwner={event.creatorId === user?.id}
                          key={event.name + index}
                        />
                      ))
                  : null}
              </Stack>
            </TabPanel>
            <TabPanel sx={{ flex: 1, overflow: "auto" }} value="2">
              <Stack gap={"1rem"}>
                {events
                  ? events
                      .sort((a, b) => {
                        const distanceA = getDistance(
                          userLat,
                          userLon,
                          a.lat,
                          a.lon
                        );
                        const distanceB = getDistance(
                          userLat,
                          userLon,
                          b.lat,
                          b.lon
                        );
                        return distanceA - distanceB;
                      })
                      .map((event, index) => (
                        <Card
                          {...event}
                          isOwner={event.creatorId === user?.id}
                          key={event.name + index}
                        />
                      ))
                  : null}
              </Stack>
            </TabPanel>
            <TabPanel sx={{ flex: 1, overflow: "auto" }} value="3">
              <Stack gap={"1rem"}>
                {events
                  ? events
                      .filter((event) => event.creatorId === user?.id)
                      .map((event, index) => (
                        <Card
                          {...event}
                          isOwner={event.creatorId === user?.id}
                          key={event.name + index}
                        />
                      ))
                  : null}
              </Stack>
            </TabPanel>
          </TabContext>
        </section>
      </Drawer>
    </>
  );
};

export default Header;
