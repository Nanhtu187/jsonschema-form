import React from "react";
import "./TooltipIcon.css";

interface TooltipIconProps {
  description?: string;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ description }) => {
  return (
    <div className="relative inline-block cursor-pointer ml-2">
      <span className="tooltip-icon inline-block w-3 h-3 rounded-full bg-black text-white text-center leading-3 text-xs font-bold dark:bg-white dark:text-black">
        ?
      </span>
      <span className="tooltip-text absolute w-max max-w-xs bg-black text-white text-center rounded-md p-0.5 z-10 bottom-full left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 dark:bg-white dark:text-black">
        {description}
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-solid border-black border-t-transparent border-r-transparent border-l-transparent dark:border-white"></span>
      </span>
    </div>
  );
};

export default TooltipIcon;
