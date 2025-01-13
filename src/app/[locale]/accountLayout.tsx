import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import SubSideMenu
const SubSideMenu = dynamic(() => import("./components/subSideMenu/page"), {
  // loading: () => <div>Loading Menu...</div>,
  ssr: false, // Set to false to disable server-side rendering for this component
});

interface LayoutProps {
  children: ReactNode;
}
const AccountLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <section className="py-28 mx-auto">
        <div className="container lg:w-[1264px] flex flex-col lg:flex-row justify-between w-full mx-auto px-4">
          <SubSideMenu />
          <div className="border-spacing-12 border-opacity-0 2xl:block lg:mt-0 mt-72">
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountLayout;
