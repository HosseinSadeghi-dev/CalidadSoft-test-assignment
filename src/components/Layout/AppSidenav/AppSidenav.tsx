import React from "react";
import ExpandableTopics from "../../ExpandableTopics/ExpandableTopics";
import Menu from "./Menu/Menu";

interface Props {
  title?: string;
}

const topics = [
  {
    name: "First level topic",
    subTopics: [
      {
        name: "Second level topic",
        subTopics: [
          { name: "Third level topic" },
          { name: "Third level topic" },
        ],
      },
      { name: "Second level topic" },
    ],
  },
  { name: "First level topic" },
];

const AppSidenav: React.FC<Props> = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">Expandable Topics</h1>
      <Menu />
    </div>
  );
};

export default AppSidenav;
