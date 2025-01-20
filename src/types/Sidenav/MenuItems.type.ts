export interface TOCEntityTree extends TOCEntity {
  subEntities?: TOCEntity[];
}

export interface TOCAnchor {
  id: number;
  title: string;
  url: string;
  anchor: string;
  level: number;
  topLevelIds: number[];
}

export interface TOCEntity {
  id: string;
  title: string;
  url?: string;
  parentId: string;
  level: number;
  tabIndex: number;
  doNotShowWarningLink?: boolean;
  pages?: string[];
  anchors?: TOCAnchor[];
}

export interface TOC {
  entities: {
    pages: Record<string, TOCEntity>;
  };
  topLevelIds: string[];
}
