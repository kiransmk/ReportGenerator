import { ReactNode } from "react";
import StickyNavbar from "../components/StickyNavbar";

type LayoutT = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutT) => {
  return (
    <div className="h-screen w-screen overflow-scroll pb-8">
      <StickyNavbar />
      {children}
    </div>
  );
};

export default Layout;
