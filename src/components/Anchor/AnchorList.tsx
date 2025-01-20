import { useAnchorStore } from "@/store/anchors.store";
import { TOCAnchor } from "@/types/Sidenav/MenuItems.type";
import React from "react";

interface Props {
  className?: string;
}

const AnchorList: React.FC<Props> = ({ className }) => {
  const anchors: TOCAnchor[] = useAnchorStore((state) => state.anchors);

  const anchorIsSelected = (anchor: string): boolean => {
    console.log("anchor", anchor.toLowerCase());
    console.log("window.location.hash", window.location.hash);

    return anchor.toLowerCase() === window.location.hash;
  };

  return (
    <nav className={`flex flex-col justify-start items-stretch ${className}`}>
      {anchors.length > 0 && (
        <>
          <b className="mb-4 dark:text-white text-sm">On this page: </b>
          <ul className="flex flex-col justify-start items-stretch text-sm">
            {anchors.map((anchor) => (
              <li
                key={anchor.id}
                className={`text-black dark:text-white border-l hover:bg-[#19191C0D] dark:hover:bg-[#252527] ${
                  anchorIsSelected(anchor.anchor)
                    ? "border-l-[#6B57FF] border-l-[3px]"
                    : "border-l-[#19191C33] dark:border-l-[#252527]"
                } pl-2`}
              >
                <a
                  href={`${anchor.anchor.toLowerCase()}`}
                  className="flex-1 py-2"
                >
                  {anchor.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default AnchorList;
