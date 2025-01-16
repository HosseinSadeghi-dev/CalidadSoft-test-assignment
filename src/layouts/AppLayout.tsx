import AppSidenav from "@/components/Sidenav/AppSidenav";
import ThemeBtn from "@/components/UI/ThemeBtn/ThemeBtn";
import React from "react";

const AppLayout: React.FC = () => {
  const sidenavWidth = 284;

  return (
    <div className={"bg-white dark:bg-[#19191C] w-full min-h-screen"}>
      <AppSidenav
        style={{
          width: `${sidenavWidth}px`,
        }}
        className={`fixed left-0 inset-y-0 border-r border-[#D1D1D2]`}
      />
      <div
        style={{
          width: `calc(100%-${sidenavWidth}px)`,
          marginLeft: `${sidenavWidth}px`,
        }}
        className="flex flex-col justify-start items-stretch pt-4 px-4"
      >
        <ThemeBtn classname="self-end" />
        <p className={`dark:text-white`}>content</p>
      </div>
    </div>
  );
};

export default AppLayout;
