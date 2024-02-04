/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

// components
import ArtistInformation from '@/components/Sections/Details/ArtistInformation';
import DetailTabs from '@/components/Sections/Details/DetailTab';
import ProductDetail from '@/components/Sections/Details/ProductDetail';
import RelatedGallery from '@/components/Sections/Details/RelatedGallery';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import ServiceSection from '@/components/Sections/Home/ServiceSection';
import PageLoader from '@/components/common/PageLoader';
import Layout from '@/components/layout';

// redux
import { useGetArtQuery } from '@/redux/features/arts/artsApi';

// types
import { ArtItem, CurrentOwnerType } from '@/types/art';

// utils
import { getObjectLength } from '@/utils';

type PageProps = {
  slug: string;
};

type ArtDetail = {
  id: number;
  regular_price: number;
  item_name: string;
  item_id: number;
  image_path: string;
};

const ArtDetail = ({ params }: { params: PageProps }) => {
  const [art, setArt] = useState<ArtItem>({} as ArtItem);
  const [artist, setArtist] = useState<CurrentOwnerType>({} as CurrentOwnerType);
  const {
    data: artDetail,
    isLoading,
    isSuccess
  } = useGetArtQuery(params?.slug, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!isLoading && isSuccess && artDetail?.status === 'success') {
      setArt(artDetail?.data);
      setArtist(artDetail?.data?.mainOwner);
    } else if (
      !isLoading &&
      isSuccess &&
      artDetail?.status === 'fail' &&
      artDetail?.message === 'no data found'
    ) {
      notFound();
    }
  }, [artDetail, isLoading, isSuccess]);

  return isLoading || getObjectLength(art) === 0 ? (
    <PageLoader />
  ) : (
    <Layout headerBottomBorder={true}>
      <ProductDetail
        art={art}
        vendorId={Number(art?.current_owner_id?.id)}
        artistId={art?.mainOwner?.id}
        artPrice={art?.regular_price}
        basePrice={art?.base_price}
        title={art?.item_name}
        aboutArt={art?.item_desc}
        image_path={art?.image_path}
        authorName={art?.mainOwner?.name}
        authorImg={art?.mainOwner?.image_path}
        country={art?.mainOwner?.country?.country_name}
        flagUrl={art?.mainOwner?.country?.country_badges}
        artId={art?.item_id}
        total_favorite={art?.total_favorite}
        total_avg_rating={art?.total_avg_rating}
        total_reviews={art?.total_review_product}
        size={art?.size_id}
        material={art?.material_id}
        medium={art?.medium_id}
        isNotSoldAble={art?.sale_status === 0}
      />
      <RelatedGallery
        artistId={Number(artist?.id)}
        artistName={artist?.name}
        artId={art?.item_id}
      />
      <DetailTabs
        item_id={art?.item_id}
        aboutArt={art?.item_desc}
        detailsDimension={art?.item_shortdesc}
        vendorId={Number(art?.current_owner_id?.id)}
        artistId={Number(art?.mainOwner?.id)}
      />
      <ArtistInformation
        artistId={Number(artist?.id)}
        artistName={artist?.name}
        artistImg={artist?.image_path}
        about={artist?.about}
        country={artist?.country?.country_name}
      />
      {/* <RecentArts /> */}
      <ServiceSection />
      <NewsLetter newsLetterForm />
    </Layout>
  );
};

export default ArtDetail;
