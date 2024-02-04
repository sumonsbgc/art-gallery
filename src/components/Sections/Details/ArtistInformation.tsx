import FollowWrapper from '@/components/RenderProps/Follow';
import { Img, SectionTitle, Title } from '@/components/common';
// import Button from '@/components/common/Button';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import { getUserInfo } from '@/redux/selector/auth.selector';
import Link from 'next/link';
import React from 'react';

type ArtistInfoType = {
  artistId: number;
  artistImg: string;
  artistName: string;
  country: string;
  about: string;
};

const ArtistInformation = ({ artistId, artistImg, artistName, country, about }: ArtistInfoType) => {
  const user = getUserInfo();
  return (
    <section className="pt-24 pb-10">
      <Wrapper>
        <SectionTitle content="Artist Information" className="!font-medium" />
        <div className="bg-gray3 px-4 py-5 sm:px-12 sm:py-14 flex flex-col gap-12 mt-4">
          <div className="flex justify-between md:items-center md:flex-row flex-col md:gap-4 gap-2">
            <div className="flex md:gap-10 lg:gap-2 gap-4 lg:items-center lg:flex-row flex-col justify-between w-full flex-wrap">
              <div className="profile-info flex items-center gap-2 w-[280px]">
                <Img
                  src={artistImg || '/assets/icons/user.svg'}
                  width={100}
                  height={100}
                  alt={artistName}
                  className="rounded-full lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] flex-shrink-0"
                />
                <div className="flex gap-2 flex-col flex-shrink-0">
                  <Title content={artistName} className="capitalize md:text-xl" />
                  <div className="flex gap-0 items-center -ml-1">
                    <Icon name="location" color="orange" />{' '}
                    <span className="text-sm text-black font-light">{country}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 lg:justify-between flex-1">
                {user?.id !== artistId && (
                  <FollowWrapper artistId={artistId}>
                    {(onFollowHandler, isFollowing, following) => (
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onFollowHandler(e)}
                        className="border border-orange text-orange uppercase font-bold text-sm px-4 py-2 sm:px-12 sm:py-3"
                      >
                        {isFollowing() || following ? 'Following' : 'Follow'}
                      </button>
                    )}
                  </FollowWrapper>
                )}
                {artistId && artistName && (
                  <Link
                    href={`/artists/${artistId}/${artistName}`}
                    className="!bg-black text-center text-white flex-shrink-0 px-4 py-2 sm:py-3 sm:px-12 text-sm font-bold uppercase"
                  >
                    View Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="italic text-base text-[#525252] font-normal leading-6">{about}</p>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ArtistInformation;
