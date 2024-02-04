import { Icon } from '../ui';

type ShareProps = {
  color?: string;
  size?: string;
  className?: string;
  onClick: () => void;
};

const Share = ({ color, size, onClick, className }: ShareProps) => {
  return (
    <div
      className={`share-wrapper flex gap-1 items-center text-black text-[12px] xs:text-sm font-medium cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon name="share" color={color || 'black'} size={size || '20'} /> Share
    </div>
  );
};

export default Share;
