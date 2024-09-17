import React from "react";
import { KeyLabel } from "../key";
import TooltipIcon from "../../icon/tooltipIcon.tsx";

export interface AccordionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Accordion = (props: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-300 rounded-lg">
      <div
        className="flex items-center justify-between p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <KeyLabel label={props.title} />
          {props.description && <TooltipIcon description={props.description} />}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && <div className="p-2">{props.children}</div>}
    </div>
  );
};
