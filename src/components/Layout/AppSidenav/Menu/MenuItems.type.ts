export interface TOCEntityTree extends TOCEntity {
  subEntities?: TOCEntity[];
}

export interface TOCEntity {
  id: string;
  title: string;
  url?: string;
  parentId?: string;
  level: number;
  tabIndex: number;
  doNotShowWarningLink?: boolean;
  pages?: string[];
}

export interface TOC {
  entities: {
    pages: Record<string, TOCEntity>;
  };
  topLevelIds: string[];
}
