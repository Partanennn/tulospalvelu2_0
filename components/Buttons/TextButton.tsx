import Button from "./Button";

interface TextButtonProps {
  value: string;
  onClick?: () => void;
}

const TextButton = ({ value, onClick = () => null }: TextButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      className="bg-opacity-0 hover:bg-neutral-700 hover:text-primary-900"
    />
  );
};

export default TextButton;
