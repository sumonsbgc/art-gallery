'use client';

import { useState } from 'react';

// components
import HeroComponent from './HeroComponent';
import FeaturedSection from './FeaturedSection';
import FeaturedSectionNew from './FeaturedSectionNew';
import PopularSection from './PopularSection';
// import ServiceSection from './ServiceSection';
import NewsLetter from './NewsLetter';
import ArtistSection from './ArtistSection';
import ArtistSectionNew from './ArtistSectionNew';
import TopRated from './TopRated';
import ArtSlides from './ArtSlides';

// config
import { isNewHomeUI } from '@/config';

const Home = () => {
  const [refetchFeatured, setRefetchFeatured] = useState(false);
  const [refetchTopRated, setRefetchTopRated] = useState(false);

  return (
    <>
      <HeroComponent />
      {isNewHomeUI ? (
        <>
          {/* new UI */}
          <FeaturedSectionNew
            needToRefetch={refetchFeatured}
            setNeedToRefetch={setRefetchTopRated}
          />
          <PopularSection />
          <ArtSlides needToRefetch={refetchTopRated} setNeedToRefetch={setRefetchFeatured} />
          {/* <ServiceSection /> */}
          <ArtistSectionNew />
        </>
      ) : (
        <>
          {/* old UI */}
          <FeaturedSection needToRefetch={refetchFeatured} setNeedToRefetch={setRefetchTopRated} />
          <PopularSection />
          <TopRated needToRefetch={refetchTopRated} setNeedToRefetch={setRefetchFeatured} />
          {/* <ServiceSection /> */}
          <ArtistSection />
        </>
      )}
      <NewsLetter newsLetterForm />
    </>
  );
};

export default Home;
