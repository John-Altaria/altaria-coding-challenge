import { Space_Grotesk } from "next/font/google";
import SVGClient from "../SVGClient";
import { IEvents } from "@/types/store-types";
import { useCoordinatesStore } from "@/store/coordStore";

const eventDeets: {
  id: number;
  svg: string;
}[] = [
  { id: 1, svg: "/svg/restaurant.svg" },
  { id: 2, svg: "/svg/concert.svg" },
  { id: 3, svg: "/svg/mechanic.svg" },
];

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface CardPropTypes extends IEvents {
  isOwner?: boolean;
}

const Card = (props: CardPropTypes) => {
  const setCurrentCoords = useCoordinatesStore(
    (state) => state.setCurrentCoords
  );
  const dateTimeString = `${props.date}T${props.time}`;
  const dateTime = new Date(dateTimeString);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="border p-[1rem] rounded-[1rem]">
      <h3
        className={`mb-[20px] text-[#1E1E1E] text-[2rem] font-[700] ${spaceGrotesk.className}`}
      >
        {props.name || "Event Name"}
      </h3>
      <div className="mb-[20px]">
        <p className="mb-[8px] text-[#9D9D9D]">Description</p>
        <p className="">
          {props.description || "This Is A placeholder description"}
        </p>
      </div>
      <div className="mb-[20px] pb-[1rem] border-b border-[#EBEBEB]">
        <p className="text-[#9D9D9D] mb-[8px]">Event Type</p>
        <div className="bg-[#F5F5F5] rounded-[6px] p-[8px] flex items-center gap-[4px] min-w-[156px] w-fit">
          <figure className="w-[24px] flex items-center justify-center aspect-square rounded-[50%] bg-[#F5DEB3]">
            {!!props.eventType.id && (
              <SVGClient
                style={{ color: "brown", width: "10px", aspectRatio: "1/1" }}
                src={
                  eventDeets.find((e) => e.id === props.eventType.id)
                    ?.svg as string
                }
              />
            )}
          </figure>
          <p className="text-[#1E1E1E] m-0 font-[500]">
            {props.eventType.name || "Restaurant"}
          </p>
        </div>
      </div>
      <div className="mb-[20px] flex gap-[1rem] items-start">
        <figure className="w-[30px] flex items-center justify-center aspect-square rounded-[50%] bg-[#F5DEB3]">
          <SVGClient style={{ color: "brown" }} src="/svg/map.svg" />
        </figure>
        <div className="">
          <p className="mb-[8px] text-[#9D9D9D]">Address</p>
          <p className="">
            {props.address || "2972 Westheimer Rd. Santa Ana, Illinois 85486"}
          </p>
        </div>
      </div>
      <div className="mb-[20px] flex gap-[1rem] items-start">
        <figure className="w-[30px] flex items-center justify-center aspect-square rounded-[50%] bg-[#F5DEB3]">
          <SVGClient style={{ color: "brown" }} src="/svg/time.svg" />
        </figure>
        <div className="">
          <p className="mb-[8px] text-[#9D9D9D]">Date & Time</p>
          <p className="">
            {formattedDate}, {formattedTime}
          </p>
        </div>
      </div>
      <div className="flex gap-[1rem] flex-wrap">
        {props.isOwner && (
          <button className="basis-[40%] flex-1 h-[58px] items-center flex justify-center gap-[1rem] bg-[#D2B48C] text-white font-[500] rounded-[1rem]">
            <SVGClient
              style={{ width: "2rem", height: "2rem", color: "inherit" }}
              src="/svg/edit.svg"
            />
            Edit
          </button>
        )}
        <button className="basis-[40%] flex-1 h-[58px] items-center flex justify-center gap-[1rem] bg-[#D2B48C] text-white font-[500] rounded-[1rem]">
          <SVGClient
            style={{ width: "2rem", height: "2rem", color: "inherit" }}
            src="/svg/bookmark.svg"
          />
          Bookmark
        </button>
        <button
          onClick={() => {
            setCurrentCoords([props.lat, props.lon]);
          }}
          className="basis-[40%] flex-1 h-[58px] items-center flex justify-center gap-[1rem] bg-[#D2B48C] text-white font-[500] rounded-[1rem]"
        >
          <SVGClient
            style={{ width: "2rem", height: "2rem", color: "inherit" }}
            src="/svg/eye.svg"
          />
          View on map
        </button>
      </div>
    </section>
  );
};

export default Card;
