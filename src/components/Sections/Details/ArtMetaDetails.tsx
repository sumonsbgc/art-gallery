import { useState } from 'react';

// components
import { LikeCount, StarRating, ReviewCount, Share } from '@/components/common';
import ShareSocialModal from '@/components/ui/SocialShareModal';

type ArtMetaPropType = {
  total_favorite: number;
  total_avg_rating: number;
  total_reviews: number;
};
const ArtMetaDetails = ({ total_favorite, total_avg_rating, total_reviews }: ArtMetaPropType) => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  return (
    <>
      <div className="product-meta flex justify-between gap-4 flex-row xs:gap-0">
        <div className="flex gap-3 xs:gap-6 items-center">
          <StarRating rating={total_avg_rating || 0} readOnly />
          <ReviewCount count={total_reviews || 0} className="border-b border-black flex-shrink-0" />
          |
          <div className="flex items-center gap-2 text-orange text-sm font-medium">
            <LikeCount likeCount={total_favorite || 0} /> {total_favorite > 1 ? 'Likes' : 'Like'}
          </div>
        </div>

        <Share onClick={() => setShowShareModal(true)} size="18" className="xs:ml-auto" />
      </div>

      {showShareModal && (
        <ShareSocialModal open={showShareModal} onClose={() => setShowShareModal(false)} />
      )}
    </>
  );
};

export default ArtMetaDetails;
