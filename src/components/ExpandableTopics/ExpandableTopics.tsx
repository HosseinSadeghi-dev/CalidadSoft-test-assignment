import React, { useState } from "react";
import { TOCEntityTree } from "../Layout/AppSidenav/Menu/MenuItems.type";
import "./ExpandableTopics.scss";
import RightArrow from "../../assets/icons/RightArrow";
import DownArrow from "../../assets/icons/DownArrow";

interface ExpandableTopicsProps {
  topics: TOCEntityTree[];
}

const ExpandableTopics: React.FC<ExpandableTopicsProps> = ({ topics }) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (topicName: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName],
    }));
  };

  const isTopicExpanded = (topicName: string): boolean =>
    expandedTopics[topicName];

  const renderTopics = (topics: TOCEntityTree[], level: number) => {
    return (
      <ul>
        {topics.map((topic) => (
          <li key={topic.title} className={`pl-${level * 4}`}>
            <div
              className={`list-name ${
                isTopicExpanded(topic.title) ? "bg-purple-100" : ""
              }`}
              onClick={() => toggleExpand(topic.title)}
              tabIndex={topic.tabIndex}
              role="button"
            >
              {topic.subEntities &&
                (isTopicExpanded(topic.title) ? <DownArrow /> : <RightArrow />)}
              <p>{topic.title}</p>
            </div>

            {topic.subEntities &&
              isTopicExpanded(topic.title) &&
              renderTopics(topic.subEntities, topic.level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="w-full">{renderTopics(topics, 0)}</div>;
};

export default ExpandableTopics;
