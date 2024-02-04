import { Icon } from '@/components/ui';
// import { Label } from 'flowbite-react';

export const RatingOption = (rating: number, resetLabel: string = 'Rate') =>
  rating === 0
    ? { value: '', label: resetLabel }
    : {
        value: String(rating),
        label: (
          <div className="flex items-center gap-2 italic">
            {rating}
            <div className="flex items-center gap-[3px]">
              {Array.from({ length: rating }, (_, i) => (
                <Icon key={i} name="star-fill" size="14" color="yellow" />
              ))}
            </div>
          </div>
        )
      };
