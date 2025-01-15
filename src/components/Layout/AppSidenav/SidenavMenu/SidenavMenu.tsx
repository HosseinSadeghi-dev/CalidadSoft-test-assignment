import React, { useCallback, useEffect, useState } from "react";
import { MenuItemsApi } from "./MenuItems.api";
import { TOC, TOCEntity, TOCEntityTree } from "./MenuItems.type";
import ExpandableTopics from "../../../ExpandableTopics/ExpandableTopics";
import Skeleton from "../../../UI/Skeleton/Skeleton";

const SidenavMenu: React.FC = () => {
  const [entityData, setEntityData] = useState<TOC>({} as TOC);
  const [treeData, setTreeData] = useState<TOCEntityTree[]>([]);
  const [searchInputText, setSearchInputText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
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

  const filterTOC = (toc: TOC, searchText: string): TOC => {
    const filteredPages: Record<string, TOCEntity> = {};

    const addParents = (pageId: string) => {
      for (const [key, page] of Object.entries(toc.entities.pages)) {
        if (page.pages?.includes(pageId) && !filteredPages[key]) {
          filteredPages[key] = page;
          addParents(key);
        }
      }
    };

    for (const [key, page] of Object.entries(toc.entities.pages)) {
      if (
        page.title
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase()) ||
        page.pages?.some((f) =>
          f.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        )
      ) {
        filteredPages[key] = page;
        addParents(key);
      }
    }

    return {
      entities: {
        pages: filteredPages,
      },
      topLevelIds: toc.topLevelIds,
    };
  };

  useEffect(() => {
    setIsLoading(true);
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchText(searchInputText);
    }, 500);
    return () => {
      clearTimeout(delayInputTimeoutId);
    };
  }, [searchInputText, debouncedSearchText]);

  useEffect(() => {
    if (!entityData?.topLevelIds?.length) {
      return;
    }
    if (!debouncedSearchText) {
      const structuredData = getStructuredData(entityData);
      setTreeData(structuredData);
    } else {
      const filteredData = filterTOC(entityData, debouncedSearchText);
      const structuredData = getStructuredData(filteredData);
      setTreeData(structuredData);
    }
    setIsLoading(false);
  }, [debouncedSearchText, entityData, getStructuredData]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response: TOC = await MenuItemsApi();
        setEntityData(response);
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

  if (error) {
    return <b className="text-red-500">{error}</b>;
  }

  return (
    <div className="flex flex-col justify-start items-stretch gap-y-2.5">
      <input
        type="text"
        value={searchInputText}
        onChange={(e) => setSearchInputText(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mx-4 bg-transparent dark:text-white dark:placeholder:text-white"
        placeholder="Search..."
      />
      {isLoading ? (
        Array.from(Array(20), (_, idx) => (
          <Skeleton key={idx} className="h-7 mx-4" />
        ))
      ) : (
        <ExpandableTopics topics={treeData} />
      )}
    </div>
  );
};

export default SidenavMenu;
