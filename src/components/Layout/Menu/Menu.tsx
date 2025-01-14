import React, { useEffect, useState } from "react";
import { MenuItemsApi } from "./MenuItems.api";
import { TOC, TOCEntity, TOCEntityTree } from "./MenuItems.type";
import ExpandableTopics from "../../ExpandableTopics/ExpandableTopics";

const Menu: React.FC = () => {
  const [treeData, setTreeData] = useState<TOCEntityTree[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response: TOC = await MenuItemsApi();

        const buildTree = (entity: TOCEntity): TOCEntityTree => ({
          ...entity,
          subEntities: entity.pages
            ?.map((id) => response.entities.pages[id])
            .filter(Boolean)
            .map(buildTree),
        });

        const structuredData = response.topLevelIds
          .map((id) => response.entities.pages[id])
          .filter(Boolean)
          .map(buildTree);

        setTreeData(structuredData);
      } catch (err) {
        setError("Failed to fetch menu items");
        console.error(err);
      }
    };

    fetchMenuItems();
  }, []);

  if (error) {
    return <b className="text-red-500">{error}</b>;
  }

  return (
    <div className="menu">
      <ExpandableTopics topics={treeData} />
    </div>
  );
};

export default Menu;
