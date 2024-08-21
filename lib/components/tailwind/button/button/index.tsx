export interface ButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`px-4 py-2 bg-[#5bc0de] text-white rounded-lg hover:bg-[#4aa8c7] focus:outline-none focus:ring-2 focus:ring-[#3a90b0] dark:bg-[#3a90b0] dark:hover:bg-[#327a99] dark:focus:ring-[#286482] ${props.className}`}
    >
      {props.text}
    </button>
  );
};
