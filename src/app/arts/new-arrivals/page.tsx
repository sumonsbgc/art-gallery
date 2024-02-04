'use client';
import Arts from '@/components/Sections/NewArrivals/Arts';
// import {NoDataFound} from '@/components/common';
import SearchFilter from '@/components/Sections/NewArrivals/SearchFilter';
import { ComponentLoader, NoDataFound } from '@/components/common';
import Layout from '@/components/layout';
import { ArtItem } from '@/types/art';
import React, { useState } from 'react';

const NewArrivals = () => {
  const [arts, setArts] = useState<ArtItem[]>([] as ArtItem[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Layout headerBottomBorder={true}>
      <SearchFilter setArts={setArts} setIsLoading={setIsLoading} />
      {isLoading && <ComponentLoader />}
      {Array.isArray(arts) && arts?.length === 0 && (
        <div className="py-10">
          <NoDataFound />
        </div>
      )}
      {!isLoading && Array.isArray(arts) && arts?.length > 0 && <Arts arts={arts as []} />}
    </Layout>
  );
};

export default NewArrivals;
