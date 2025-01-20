import AnchorList from "@/components/Anchor/AnchorList";
import AppSidenav from "@/components/Sidenav/AppSidenav";
import ThemeBtn from "@/components/UI/ThemeBtn/ThemeBtn";
import React, { useEffect, useState } from "react";

const AppLayout: React.FC = () => {
  const sidenavWidth = 284;
  const [fragment, setFragment] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setFragment(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
        <div className="flex flex-row justify-between items-start mt-4">
          <p className={`dark:text-white`}>{fragment}</p>
          <AnchorList className={"mr-8 w-56"} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
