interface ButtonProps {
  value: string;
  className?: string;
  isTransparent?: boolean;
  onClick?: () => void;
}

const Button = ({
  value,
  className = "",
  onClick = () => null,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary-600 px-5 py-2 rounded-full hover:bg-primary-500 ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
