import { useAnchorStore } from "@/store/anchors.store";
import { TOCAnchor } from "@/types/Sidenav/MenuItems.type";
import React from "react";

interface Props {
  className?: string;
}

const AnchorList: React.FC<Props> = ({ className }) => {
  const anchors: TOCAnchor[] = useAnchorStore((state) => state.anchors);

  return (
    <nav className={`flex flex-col justify-start items-stretch ${className}`}>
      {anchors.length > 0 && (
        <>
          <b className="mb-4 dark:text-white text-sm">On this page: </b>
          <ul className="flex flex-col justify-start items-stretch text-sm">
            {anchors.map((anchor) => (
              <li key={anchor.id} className="text-black dark:text-white">
                <a
                  href={`${anchor.anchor.toLowerCase()}`}
                  className="hover:bg-blue-300 flex-1 py-2"
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
