import { useState } from "react";
import { ThemeMode } from "../../../../utils/enums/theme.ts";

export const ToggleButton = () => {
  const [mode, setMode] = useState(ThemeMode.LIGHT);

  const toggleDarkMode = () => {
    setMode(mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
    document.documentElement.classList.toggle("dark", mode === ThemeMode.LIGHT);
  };

  return (
    <label className="flex items-center space-x-3">
      <input
        type="checkbox"
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      <span className="text-gray-900 dark:text-gray-200">{mode} mode</span>
    </label>
  );
};
