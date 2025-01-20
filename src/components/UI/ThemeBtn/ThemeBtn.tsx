import MoonIcon from "@/assets/icons/Moon.icon";
import SunIcon from "@/assets/icons/Sun.icon";
import React, { useState, useEffect } from "react";

interface Props {
  classname?: string;
}

const ThemeBtn: React.FC<Props> = ({ classname }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full flex items-center ${classname}`}
    >
      {isDarkMode ? (
        <>
          <SunIcon className="fill-white w-5 h-5 mr-1" />
          Light Mode
        </>
      ) : (
        <>
          <MoonIcon className="stroke-black w-5 h-5 mr-1" />
          Dark Mode
        </>
      )}
    </button>
  );
};

export default ThemeBtn;
