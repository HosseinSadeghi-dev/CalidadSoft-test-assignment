import React from "react";

interface Props {
  className?: string;
}

const AnchorList: React.FC<Props> = ({ className }) => {
  const anchors = ["Home", "About", "Services", "Contact"];

  return (
    <nav className={`flex flex-col justify-start items-stretch ${className}`}>
      <b className="mb-4 dark:text-white">On this page: </b>
      <ul className="flex flex-col justify-start items-stretch">
        {anchors.map((anchor) => (
          <li key={anchor} className="text-black dark:text-white">
            <a
              href={`#${anchor.toLowerCase()}`}
              className="hover:bg-blue-300 flex-1 py-2"
            >
              {anchor}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AnchorList;
