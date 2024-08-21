export interface KeyLabelProps {
  label: string;
  className?: string;
}

export const KeyLabel = (props: KeyLabelProps) => {
  return (
    <label
      className={`font-bold text-gray-900 dark:text-gray-100 ${props.className}`}
    >
      {props.label}
    </label>
  );
};
