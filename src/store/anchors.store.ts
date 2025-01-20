import { TOCAnchor } from "@/types/Sidenav/MenuItems.type";
import { create } from "zustand";

interface AnchorState {
  anchors: TOCAnchor[];
  setAnchors: (anchors: TOCAnchor[]) => void;
}

export const useAnchorStore = create<AnchorState>()((set) => ({
  anchors: [],
  setAnchors: (newAnchors) => set(() => ({ anchors: newAnchors })),
}));
