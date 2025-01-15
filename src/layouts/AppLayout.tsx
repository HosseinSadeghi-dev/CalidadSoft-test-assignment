import AppSidenav from "@/components/Sidenav/AppSidenav";
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
      <p
        style={{
          width: `calc(100%-${sidenavWidth}px)`,
          marginLeft: `${sidenavWidth}px`,
        }}
        className={`dark:text-white p-4`}
      >
        content
      </p>
    </div>
  );
};

export default AppLayout;
