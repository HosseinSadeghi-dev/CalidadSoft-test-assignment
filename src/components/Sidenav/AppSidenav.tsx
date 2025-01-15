import React from "react";
import SidenavMenu from "./SidenavMenu/SidenavMenu";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const AppSidenav: React.FC<Props> = ({ className, style }) => {
  return (
    <div className={`pt-6 overflow-y-auto ${className}`} style={style}>
      <SidenavMenu />
    </div>
  );
};

export default AppSidenav;
