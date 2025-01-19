import axiosInstance from "@/utils/axiosInstance";
import { TOC } from "@/types/Sidenav/MenuItems.type";
import axios from "axios";

export const MenuItemsApi = (): Promise<TOC> => {
  return axiosInstance.get("/api/help/idea/2023.1/HelpTOC.json");
};

export const getMenuItemAnchors = (menuURL: string): Promise<any> => {
  return axios.get(`/api/help/idea/2023.1/${menuURL}`);
};

(async () => {
  const url =
    "https://www.jetbrains.com/help/idea/2023.1/guided-tour-around-the-user-interface.html";

  try {
    // Fetch the HTML content
    const response = await fetch(url);
    const htmlText = await response.text();

    // Parse the HTML into a DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");

    // Select the script by its ID
    const scriptTag = doc.querySelector("script#virtual-toc-data");

    if (scriptTag) {
      // Parse the JSON content
      const jsonData = JSON.parse(scriptTag.textContent);
      console.log(jsonData);
    } else {
      console.log('Script with ID "virtual-toc-data" not found.');
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
