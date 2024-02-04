import { Icon } from '@/components/ui';

type RatingViewProp = {
  rating?: number;
  size?: string;
  color?: string;
  textClassName?: string;
  gap?: string;
  noHoverEffect?: boolean;
};

const RatingView = ({
  rating,
  size = '24',
  color = 'yellow',
  textClassName = 'text-black text-sm font-medium pl-1',
  gap = '3px',
  noHoverEffect = false
}: RatingViewProp) => {
  const ratingValue = Math.round(rating || 5);

  return (
    <div className={`flex items-center gap-[${gap}]`}>
      {Array.from({ length: ratingValue }, (_, i) => (
        <Icon key={i} name="star-fill" color={color} size={size} noHoverEffect={noHoverEffect} />
      ))}
      {Array.from({ length: 5 - ratingValue }, (_, i) => (
        <Icon key={i} name="star" color={color} size={size} noHoverEffect={noHoverEffect} />
      ))}
      <p className={textClassName}>{ratingValue}/5</p>
    </div>
  );
};

export default RatingView;
