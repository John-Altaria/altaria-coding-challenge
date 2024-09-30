"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCoordinatesStore } from "@/store/coordStore";
import { Drawer, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useEventsStore } from "@/store/eventsStore";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState } from "react";
import SVGClient from "../SVGClient";
import { Space_Grotesk } from "next/font/google";
import Input from "../Input";
import { ClipLoader } from "react-spinners";
import { useEventsEndpoints } from "@/hooks/useEventsEndpoints";
import { IEventsPayload } from "@/types/api";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

type ITypesDefinition =
  | "text"
  | "number"
  | "email"
  | "textarea"
  | "select"
  | "date"
  | "time";

const SetViewOnMount = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const ClickHandler = ({
  setOpen,
  setFormData,
}: {
  setOpen: (state: boolean) => void;
  setFormData: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      setOpen(true);
      setFormData(lat, lng);
    },
  });
  return null;
};

const Map = () => {
  const coords = useCoordinatesStore((state) => state.coordinates);
  const currentCoords = useCoordinatesStore((state) => state.currentCoords);
  const events = useEventsStore((state) => state.events);
  const eventTypes = useEventsStore((state) => state.eventTypes);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<
    Record<string | number, string | number>
  >({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addEvent, fetchEvents } = useEventsEndpoints();

  // form
  const eventFields: {
    label: string;
    placeholder?: string;
    type: ITypesDefinition;
    name: string;
    disabled?: boolean;
    selectOptions?: { id: number; name: string }[];
  }[] = [
    {
      label: "Event Name",
      placeholder: "Input Event Name",
      type: "text",
      name: "name",
    },
    {
      label: "Event Type",
      type: "select",
      placeholder: "Select Event Type",
      selectOptions: eventTypes,
      name: "type",
    },
    {
      label: "Latitude",
      placeholder: "Input Location Lat",
      type: "number",
      name: "lat",
    },
    {
      label: "Longitude",
      placeholder: "Input Location Long",
      type: "number",
      name: "lon",
    },
    {
      label: "Event Description",
      placeholder: "Input Event Description",
      type: "text",
      name: "description",
    },
    {
      label: "Event Address",
      placeholder: "Input Event Address",
      type: "text",
      name: "address",
    },
    {
      label: "Event Date",
      placeholder: "Input Event Date",
      type: "date",
      name: "date",
    },
    {
      label: "Event Start Time",
      placeholder: "Input Event Time",
      type: "time",
      name: "time",
    },
  ];

  // form logic
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    eventFields.flat().forEach((field) => {
      if (typeof field === "object" && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    addEvent(formData as unknown as IEventsPayload, (status) => {
      setIsSubmitting(false);
      if (status) {
        fetchEvents();
        setFormData({});
      }
    });
  };

  // map logic
  if (!coords.every((value) => !!value)) {
    return (
      <Stack
        height={"100%"}
        m={0}
        p={0}
        direction={"row"}
        flexWrap={"wrap"}
        gap={"1rem"}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton
            key={index}
            sx={{
              height: "40vh",
              flexBasis: "40vw",
              flexGrow: 1,
              margin: 0,
              padding: 0,
              transform: "scale(1)",
            }}
          />
        ))}
      </Stack>
    );
  }

  const defaultCenter: [number, number] = currentCoords || coords;
  const defaultZoom = 16;
  const customIcon = new Icon({
    iconUrl: "/svg/marker.svg",
    iconSize: [38, 38],
  });
  const userIcon = new Icon({
    iconUrl: "/svg/map-pin.svg",
    iconSize: [38, 38],
  });

  return (
    <>
      <MapContainer style={{ height: "100%", width: "100%" }}>
        <SetViewOnMount center={defaultCenter} zoom={defaultZoom} />
        <ClickHandler
          setFormData={(lat, lon) =>
            setFormData((prev) => ({
              ...prev,
              lat,
              lon,
            }))
          }
          setOpen={setOpen}
        />
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup chunkedLoading>
          <Marker position={coords} icon={userIcon}>
            <Popup>
              <Stack spacing={2}>
                <Paper elevation={0}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    Your Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    This is your location
                  </Typography>
                </Paper>
              </Stack>
            </Popup>
          </Marker>
          {events.map((event, index) => (
            <Marker
              position={[event.lat, event.lon]}
              icon={customIcon}
              key={index}
            >
              <Popup>
                <Stack spacing={2}>
                  <Paper elevation={0}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        fontSize: "1.5rem",
                      }}
                    >
                      {event.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontStyle: "italic",
                        fontSize: "1rem",
                      }}
                    >
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {new Date(
                        `${event.date}T${event.time}`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", fontSize: "1.1rem" }}
                    >
                      {event.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontStyle: "italic",
                        fontSize: "1.1rem",
                      }}
                    >
                      {event.address}
                    </Typography>
                  </Paper>
                </Stack>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <section className="md:w-[30vw] w-[95vw] border overflow-hidden h-[100vh] gap-[2rem] flex flex-col">
          <div className="flex text-[2.5rem] pt-[3rem] w-fit mx-auto items-center gap-[1rem]">
            <SVGClient
              style={{ width: "2.5rem", height: "2.5rem", color: "#000" }}
              src="/svg/new.svg"
            />
            <h3 className={`m-0 p-0 ${spaceGrotesk.className}`}>
              Create Event
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] flex flex-col gap-[2rem] mx-auto mt-[2rem]"
          >
            {eventFields.map((field, index) => (
              <Input
                key={"field__" + index}
                variant="outlined"
                placeholder={field.placeholder || undefined}
                label={field.label || undefined}
                name={field.name}
                onChange={handleInputChange}
                error={formErrors[field.name]}
                type={field.type}
                selectOptions={field.selectOptions}
                value={formData[field.name] || ""}
              />
            ))}
            <button
              disabled={isSubmitting}
              className="h-[58px] disabled:cursor-not-allowed items-center flex justify-center gap-[1rem] bg-[#D2B48C] text-white font-[500] rounded-[1rem]"
            >
              {isSubmitting && <ClipLoader size={20} color="inherit" />}
              Add Event
            </button>
          </form>
        </section>
      </Drawer>
    </>
  );
};

export default Map;
