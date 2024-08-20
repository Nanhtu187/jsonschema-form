export interface BooleanInputProps {
  name: string;
  defaultValue: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const BooleanInput = (props: BooleanInputProps) => {
  return (
    <input
      name={props.name}
      type="checkbox"
      checked={props.defaultValue}
      onChange={props.onChange}
      className="w-5 h-5 text-blue-500 border border-gray-300 rounded-md focus:ring-blue-500"
    />
  );
};
