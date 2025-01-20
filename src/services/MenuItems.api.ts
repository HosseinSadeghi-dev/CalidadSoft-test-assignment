import axiosInstance from "@/utils/axiosInstance";
import { TOC, TOCAnchor } from "@/types/Sidenav/MenuItems.type";
import axios from "axios";

export const MenuItemsApi = (): Promise<TOC> => {
  // return axiosInstance.get("/api/help/idea/2023.1/HelpTOC.json");
  return axiosInstance.get("/data/data.json");
};

export const getMenuItemAnchors = (
  menuURL: string
): Promise<{ data: string }> => {
  return axios.get(`/api/help/idea/2023.1/${menuURL}`);
};

// this function extract all anchors from original route and gathered in data.json
export const getAnchors = async (htmlName: string) => {
  try {
    const response = await getMenuItemAnchors(htmlName);
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");

    const scriptTag = doc.querySelector("script#virtual-toc-data");

    if (scriptTag?.textContent) {
      const jsonData: TOCAnchor[] = JSON.parse(scriptTag.textContent);
      if (jsonData?.length) {
        return jsonData;
      }
    } else {
      console.error('Script with ID "virtual-toc-data" not found.');
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
