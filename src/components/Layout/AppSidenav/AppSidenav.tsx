import React from "react";
import SidenavMenu from "./SidenavMenu/SidenavMenu";

interface Props {
  className?: string;
}

const AppSidenav: React.FC<Props> = ({ className }) => {
  return (
    <div className={`pt-6 overflow-y-auto ${className}`}>
      <SidenavMenu />
    </div>
  );
};

export default AppSidenav;
