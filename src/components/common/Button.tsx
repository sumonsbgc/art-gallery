'use client';

interface IButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ children, className, onClick, disabled, type }: IButtonProps) => {
  return (
    <button
      className={`bg-orange border-none px-4 py-2 sm:py-4 sm:px-12 text-base font-medium uppercase ${className}`}
      name="btn-art"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
