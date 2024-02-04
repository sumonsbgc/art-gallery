/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Badge } from '@/components/common';
import Img from '@/components/common/Img';
import { Icon } from '@/components/ui';
import { openAuthModal } from '@/redux/features/auth/authSlice';
import {
  useAddLikeMutation,
  useGetLikesQuery,
  useRemoveLikeMutation
} from '@/redux/features/like/likeApi';
import { useAppDispatch } from '@/redux/hooks';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { getLikeArtIds } from '@/redux/selector/like.selector';
import { countLike } from '@/utils';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

type ArtGalleryProp = {
  image_path: string;
  itemLabel: string;
  itemId: number;
  artistId: number;
  vendorId: number;
  totalFavorite: number;
};

const ArtGallery = ({
  image_path,
  itemLabel,
  itemId,
  totalFavorite,
  artistId,
  vendorId
}: ArtGalleryProp) => {
  const dispatch = useAppDispatch();
  const user = getUserInfo();
  useGetLikesQuery({});
  const likeArtIds = getLikeArtIds();
  const isAuthUser = checkAuthUser();

  const [addLike, { isError, error }] = useAddLikeMutation();
  const [removeLike, { isError: isRemoveError, error: removeError }] = useRemoveLikeMutation();

  const handleLikeClick = async (itemId: number) => {
    try {
      if (isAuthUser) {
        if (user?.id === artistId || vendorId === user?.id) {
          return;
        }
        const isLiked = likeArtIds?.includes(itemId) || false;
        const formData = new FormData();
        formData.append('item_id', String(itemId));
        if (isLiked) {
          removeLike(formData);
        } else {
          addLike(formData);
        }
      } else {
        dispatch(openAuthModal());
      }
    } catch (error) {
      console.log('>>> handleLikeClick', error);
    }
  };

  useEffect(() => {
    if (isError || isRemoveError) {
      console.log(error, removeError);
      Swal.fire({
        title: 'Error',
        text: 'Ooops! There Is Something Wrong!',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError, isRemoveError]);

  return (
    <div className="detail-gallery-wrapper flex gap-2 sm:gap-6 flex-col sm:flex-row">
      <div className="single-thumbnail bg-[#F4F4F4] w-full sm:w-[585px] sm:h-[575px] h-[340px] relative">
        {itemLabel && <Badge content={itemLabel} />}
        <span className="h-[23px] px-2 py-4 bg-[#848484]/75 rounded-full flex justify-center items-center gap-1 absolute right-2 top-3 z-20">
          <span className="text-white text-[14px] font-medium">
            {countLike(totalFavorite || 0)}
          </span>
          <Icon
            name={likeArtIds?.includes(itemId) ? 'heart-fill' : 'heart'}
            handleClick={() => handleLikeClick(itemId)}
            color="white"
          />
        </span>
        <Img
          src={image_path}
          layout
          alt="Art Images"
          sizes={'(max-width: 768px) 1600px, (max-width: 1200px) 1800px, 1700px'}
        />
      </div>
    </div>
  );
};

export default ArtGallery;
