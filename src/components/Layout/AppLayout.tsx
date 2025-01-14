import React from "react";
import AppSidenav from "./AppSidenav/AppSidenav";

const AppLayout: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#19191C]">
      <AppSidenav
        className={"fixed left-0 inset-y-0 w-[284px] border-r border-[#D1D1D2]"}
      />
    </div>
  );
};

export default AppLayout;
