import React from "react";

const DownArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.6693 1H1.33594L6.0026 6.33333L10.6693 1Z" />
  </svg>
);

export default DownArrow;
