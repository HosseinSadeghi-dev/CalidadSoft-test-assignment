import React, { useState } from "react";
import AppSidenav from "./AppSidenav/AppSidenav";

const AppLayout: React.FC = () => {
  const [sidenavWidth] = useState<number>(284);

  return (
    <div className={"bg-white dark:bg-[#19191C] w-full min-h-screen"}>
      <AppSidenav
        className={`fixed left-0 inset-y-0 w-[${sidenavWidth}px] border-r border-[#D1D1D2]`}
      />
      <p
        className={`w-[calc(100%-${sidenavWidth}px)] ml-[${sidenavWidth}px] dark:text-white p-4`}
      >
        content
      </p>
    </div>
  );
};

export default AppLayout;
