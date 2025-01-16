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
      className={`p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full ${classname}`}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeBtn;
