import React, { useState } from "react";
import { TOCEntityTree } from "../Layout/AppSidenav/SidenavMenu/MenuItems.type";
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

  const toggleExpand = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const isTopicExpanded = (topicId: string): boolean => expandedTopics[topicId];

  const isTopicWithChildExpanded = (topic: TOCEntityTree): boolean =>
    topic.level > 0 && !!topic.pages?.length && isTopicExpanded(topic.id);

  const renderTopics = (topics: TOCEntityTree[], level: number) => {
    return (
      <ul>
        {topics.map((topic) => (
          <li
            key={topic.id}
            className={`
              pl-${level * 4}
              ${isTopicExpanded(topic.id) ? "!bg-zinc-100" : ""}
              ${isTopicWithChildExpanded(topic) ? "!bg-gray-200" : ""}
            `}
          >
            <div
              className={`list-name`}
              onClick={() => toggleExpand(topic.id)}
              tabIndex={topic.tabIndex}
              role="button"
            >
              {topic.subEntities &&
                (isTopicExpanded(topic.id) ? <DownArrow /> : <RightArrow />)}
              <p>{topic.title}</p>
            </div>

            {topic.subEntities && (
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isTopicExpanded(topic.id) ? "max-h-screen" : "max-h-0"
                }`}
              >
                {isTopicExpanded(topic.id) &&
                  renderTopics(topic.subEntities, topic.level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderTopics(topics, 0)}</div>;
};

export default ExpandableTopics;
