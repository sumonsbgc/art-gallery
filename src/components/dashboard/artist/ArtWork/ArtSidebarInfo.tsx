import { Text, Title } from '@/components/common';
import Img from '@/components/common/Img';
import LikeCount from '@/components/common/LikeCount';
import React from 'react';

type ArtSidebarProp = {
  thumbnail: string;
  avgReviews: string;
  avrRating: number;
  criticRating: number;
  totalLikes: number;
  className?: string;
};

const ArtSidebarInfo = ({
  thumbnail,
  avgReviews,
  avrRating,
  criticRating,
  totalLikes,
  className
}: ArtSidebarProp) => {
  return (
    <aside className={`flex-col ${className}`}>
      <table className="table w-full text-center">
        <tbody>
          <tr>
            <td className="border border-orange">
              <Text>Average Rating</Text>
              <Title content={avrRating ? `${avrRating.toFixed(2)}/5` : '0/5'} />
            </td>
            <td className="border border-orange">
              <Text>Critic Reviews</Text>
              <Title content={criticRating ? String(criticRating) : '0'} />
            </td>
          </tr>
          <tr>
            <td className="border border-orange">
              <Text>Average Reviews</Text>
              <Title content={avgReviews} />
            </td>
            <td className="border border-orange">
              <Text>Total Likes</Text>
              <LikeCount likeCount={totalLikes || 0} className="justify-center" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="relative w-full overflow-hidden mt-5">
        {thumbnail ? <Img src={thumbnail} alt="Art" layout /> : null}
      </div>
    </aside>
  );
};

export default ArtSidebarInfo;
