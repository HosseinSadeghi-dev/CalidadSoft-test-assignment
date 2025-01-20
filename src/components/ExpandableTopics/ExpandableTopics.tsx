import React, { useState } from "react";
import { TOCEntityTree } from "@/types/Sidenav/MenuItems.type";
import "./ExpandableTopics.scss";
import RightArrowIcon from "@assets/icons/RightArrow.icon";
import { useAnchorStore } from "@/store/anchors.store";

interface ExpandableTopicsProps {
  topics: TOCEntityTree[];
}

const ExpandableTopics: React.FC<ExpandableTopicsProps> = ({ topics }) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const setAnchors = useAnchorStore((state) => state.setAnchors);

  const toggleExpand = (topic: TOCEntityTree) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic.id]: !prev[topic.id],
    }));
    checkAndSetAnchors(topic);
  };

  const isTopicExpanded = (topicId: string): boolean => expandedTopics[topicId];

  const isTopicWithChildExpanded = (topic: TOCEntityTree): boolean =>
    topic.level > 0 && !!topic.pages?.length && isTopicExpanded(topic.id);

  const checkAndSetAnchors = (topic: TOCEntityTree) => {
    if (!topic.subEntities) {
      setAnchors(topic.anchors ?? []);
    }
  };

  const renderTopics = (topics: TOCEntityTree[], level: number) => {
    return (
      <ul>
        {topics.map((topic) => {
          return (
            <li
              key={topic.id}
              className={`
                ${
                  isTopicExpanded(topic.id)
                    ? "bg-zinc-100 dark:bg-neutral-800"
                    : ""
                }
                ${
                  isTopicWithChildExpanded(topic)
                    ? "!bg-gray-200 dark:!bg-zinc-800"
                    : ""
                }
              `}
            >
              <div
                className={`pl-${level * 4 + 4} list-name`}
                onClick={() => toggleExpand(topic)}
                tabIndex={topic.tabIndex}
                role="button"
              >
                {topic.subEntities && (
                  <div
                    className={`transition-transform duration-300 ${
                      isTopicExpanded(topic.id) ? "rotate-90" : ""
                    }`}
                  >
                    <RightArrowIcon className="dark:fill-white fill-black" />
                  </div>
                )}
                <p>{topic.title}</p>
              </div>

              {topic.subEntities && (
                <div
                  className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
                    isTopicExpanded(topic.id) ? "max-h-[200dvh]" : "max-h-0"
                  }`}
                >
                  {isTopicExpanded(topic.id) &&
                    renderTopics(topic.subEntities, topic.level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div>{renderTopics(topics, 0)}</div>;
};

export default ExpandableTopics;
