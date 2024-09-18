interface ButtonProps {
  value: string;
}

const Button = ({ value }: ButtonProps) => {
  return (
    <button className="bg-primary-600 px-5 rounded-full hover:bg-primary-500">
      {value}
    </button>
  );
};

export default Button;
