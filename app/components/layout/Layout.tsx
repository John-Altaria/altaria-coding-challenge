import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col gap-[1rem] h-[100vh]">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
