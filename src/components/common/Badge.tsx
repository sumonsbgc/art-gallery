type BadgeProps = {
  content: string;
  className?: string;
};

const Badge = ({ content, className }: BadgeProps) => {
  return (
    <span
      className={`bg-black w-[75px] inline-block text-white text-center text-[12px] font-medium py-2 absolute z-10 left-0 top-0 ${className}`}
    >
      {content}
    </span>
  );
};

export default Badge;
