import Button from "./Button";

interface TextButtonProps {
  value: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const TextButton = ({
  value,
  onClick = () => null,
  isSelected = false,
}: TextButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      className={`
        bg-opacity-0 
        hover:bg-neutral-700
        ${isSelected ? "border-white border-2" : ""}`}
    />
  );
};

export default TextButton;
