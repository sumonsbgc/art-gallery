import { Rating } from 'react-simple-star-rating';

type RatingProps = {
  rating: number;
  size?: number;
  readOnly?: boolean;
  color?: string;
  iconsCount?: number;
};

const StarRating = ({ rating, size, readOnly = false, color, iconsCount }: RatingProps) => {
  return (
    <Rating
      initialValue={Math.floor(rating) || 0}
      size={size || 15}
      readonly={readOnly}
      iconsCount={iconsCount || 5}
      fillColor={color || '#F89828'}
    />
  );
};

export default StarRating;
