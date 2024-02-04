'use client';

import Link from 'next/link';

// components
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';

const ArtistsHeroSection = () => {
  const userInfo = getUserInfo();

  const isArtist = userInfo?.is_artist === 2 || false;

  return (
    <section className="artists-hero-section h-[252px] md:h-[477px]">
      <Wrapper>
        <div className="max-w-[1120px] -mt-16 md:mt-6 mx-auto flex justify-content-center items-center gap-8">
          <div className="w-full">
            <div className="w-full text-center">
              <h2 className="text-white text-[36px] font-[500] -mt-16 md:mt-10 mb-4">Artists</h2>
            </div>
            <div className="w-full -mt-2 md:mt-0 text-center">
              <p className="text-white text-[16px] font-[400] italic mb-4">
                An artist is a skilled creator who uses various techniques and mediums to express
                their artistic vision, often showcasing their work in exhibitions or galleries. Art
                Grade will give them a platform to show case their talent across the globe.
              </p>
            </div>
            <div
              className={`w-full mt-0 md:mt-10 flex justify-center items-center ${
                isArtist && 'hidden'
              }`}
            >
              <Link
                className="w-[213px] md:w-[226px] h-[38px] md:h-[55px] bg-white uppercase flex justify-center items-center gap-2"
                href="/artists/register"
              >
                <span className="text-orange text-[16px] font-[500]">Be An Artist</span>
                <Icon name="arrow-right-long" color="orange" size="13" />
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ArtistsHeroSection;
