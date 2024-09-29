import { authStore } from "@/store/userStore";
import { Space_Grotesk } from "next/font/google";
import SVGClient from "../SVGClient";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const Header = () => {
  const user = authStore((state) => state.user);
  return (
    <header className="flex justify-between max-w-[95%] md:w-[90%] w-full py-[1rem] border-b mx-auto items-center">
      <h1 className={`m-0 text-[2.5rem] ${spaceGrotesk.className}`}>Map App</h1>
      <button className="flex text-[1.5rem] gap-[.85rem] items-center">
        <SVGClient
          style={{ width: "2rem", height: "2rem", color: "#000" }}
          src="/svg/filter.svg"
        />
        Filter
      </button>
      <span className="text-[1.5rem]">Hi {user?.email.split("@")[0]}</span>
    </header>
  );
};

export default Header;
