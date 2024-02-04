import { useRouter } from 'next/navigation';

// redux
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/hooks';
import { getReviewLabel } from '@/utils';

type ReviewCountProps = {
  className: string;
  count: number;
};

const ReviewCount = ({ className, count }: ReviewCountProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    // details-tab
    if (window && typeof window !== 'undefined') {
      console.log(`${window.location}`, 'WINDOW LOCATION');
      router.push(`${window.location.href}/#details-tab`);
    }

    dispatch(toggleActiveTab({ activeTab: 'review-rates' }));
  };

  return (
    <span
      className={`text-black text-[12px] xs:text-sm font-medium cursor-pointer ${className}`}
      onClick={clickHandler}
    >
      {getReviewLabel(count)}
    </span>
  );
};

export default ReviewCount;
