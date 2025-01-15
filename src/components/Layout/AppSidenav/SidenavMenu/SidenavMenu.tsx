import React, { useCallback, useEffect, useState } from "react";
import { MenuItemsApi } from "./MenuItems.api";
import { TOC, TOCEntity, TOCEntityTree } from "./MenuItems.type";
import ExpandableTopics from "../../../ExpandableTopics/ExpandableTopics";
import Skeleton from "../../../UI/Skeleton/Skeleton";

const SidenavMenu: React.FC = () => {
  const [treeData, setTreeData] = useState<TOCEntityTree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const buildTree = useCallback(
    (entity: TOCEntity, pages: Record<string, TOCEntity>): TOCEntityTree => ({
      ...entity,
      subEntities: entity.pages
        ?.map((id) => pages[id])
        .filter(Boolean)
        .map((subEntity) => buildTree(subEntity, pages)),
    }),
    []
  );

  const getStructuredData = useCallback(
    (response: TOC): TOCEntityTree[] =>
      response.topLevelIds
        .map((id) => response.entities.pages[id])
        .filter(Boolean)
        .map((entity) => buildTree(entity, response.entities.pages)),
    [buildTree]
  );

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response: TOC = await MenuItemsApi();
        const structuredData = getStructuredData(response);
        setTreeData(structuredData);
      } catch (err) {
        setError("Failed to fetch menu items");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenuItems();
  }, [getStructuredData]);

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col justify-start items-stretch w-full px-4 gap-y-2">
          {Array.from(Array(20), (idx) => (
            <Skeleton key={idx} className="h-7" />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return <b className="text-red-500">{error}</b>;
  }

  return <ExpandableTopics topics={treeData} />;
};

export default SidenavMenu;
