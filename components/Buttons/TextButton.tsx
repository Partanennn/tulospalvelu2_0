import Button from "./Button";

interface TextButtonProps {
  value: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  borderStyle?: string;
}

const TextButton = ({
  value,
  onClick = () => null,
  isSelected = false,
  className = "",
  borderStyle = "border-primary-900 border-2",
}: TextButtonProps) => {
  return (
    <Button
      value={value}
      onClick={onClick}
      className={`
        bg-opacity-0 
        hover:bg-neutral-700
        ${isSelected ? borderStyle : ""} ${className}`}
    />
  );
};

export default TextButton;
