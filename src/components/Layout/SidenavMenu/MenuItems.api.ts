import axiosInstance from "@/utils/axiosInstance";
import { TOC } from "./MenuItems.type";

export const MenuItemsApi = (): Promise<TOC> => {
  return axiosInstance.get("/api/help/idea/2023.1/HelpTOC.json");
};
