import { ReactNode } from "react";
interface ButtonOneProps {
  children: ReactNode;
  bg: string;
  hoverBg: string;
  textColor: string;
  onClick: () => void;
  disabled?: boolean;
  isFavorited?: boolean;
}
const ButtonOne = ({
  children,
  bg,
  hoverBg,
  textColor,
  onClick,
  disabled,
  isFavorited,
}: ButtonOneProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${bg} ${hoverBg} ${textColor} mb-6 ${isFavorited ? "text-gray-600/50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default ButtonOne;
