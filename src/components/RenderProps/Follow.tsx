/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useFollowArtistMutation } from '@/redux/features/artist/artistApi';
import Cookies from 'js-cookie';
import { AuthModal } from '../common';
import { useAppDispatch } from '@/redux/hooks';
import { fetchFollowerIdList } from '@/redux/features/auth/followerSlice';
import { getFollowerList } from '@/redux/selector/follower.selector';
type RPFunction = (
  onFollowHandler: (e: React.MouseEvent<HTMLButtonElement>) => void,
  isFollowing: () => boolean,
  following: boolean
) => void;

interface RPFollower {
  children: RPFunction;
  artistId: number;
}

const FollowWrapper = ({ children, artistId }: RPFollower) => {
  const dispatch = useAppDispatch();
  const followers = getFollowerList();

  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [followingUsers, setFollowingUsers] = useState<number[]>([]);
  const [following, setFollowing] = useState<boolean>(false);

  const [follow, { isSuccess: followSuccess }] = useFollowArtistMutation();

  useEffect(() => {
    dispatch(fetchFollowerIdList());
  }, []);

  useEffect(() => {
    if (followSuccess) {
      dispatch(fetchFollowerIdList());
    }
  }, [followSuccess]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setFollowing(followers?.includes(artistId));
    }
    setFollowingUsers(followers);
  }, [followers]);

  const isFollowing = useCallback(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      return followers?.includes(artistId);
    }
    return false;
  }, [followingUsers?.length]);

  const onFollowHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      setOpenAuthModal(true);
    } else {
      const formData = new FormData();
      formData.append('following_user_id', String(artistId));
      follow(formData);
    }
  };

  return (
    <>
      <div>
        {children(onFollowHandler, isFollowing, following) as unknown as ReactElement<any, any>}
      </div>
      <AuthModal onClose={() => setOpenAuthModal(false)} open={openAuthModal} />
    </>
  );
};

export default FollowWrapper;
