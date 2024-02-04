import Button from '@/components/common/Button';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import BreadCrumb from '@/components/ui/BreadCrumb';
import React, { useEffect, useState } from 'react';
import ArtGallery from './ArtGallery';
import ArtMetaDetails from './ArtMetaDetails';
import Feature from './Feature';
import ArtDetail from './ArtDetail';
import ArtPrice from './ArtPrice';
import { addToCart } from '@/redux/features/carts/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useAddItemToOrderMutation } from '@/redux/features/carts/cartsApi';
import { getUserSessionId } from '@/utils';
import { useRouter } from 'next/navigation';
import UploadLoader from '@/components/common/UploadLoader';
import Cookies from 'js-cookie';
import { AuthModal } from '@/components/common';
import PriceShortChart from './PriceShortChart';
import { getCartList } from '@/redux/selector/cart.selector';
import { cartType } from '@/redux/features/carts/cart.types';
import Swal from 'sweetalert2';
import { ArtItem, elementType } from '@/types/art';
import { CartItemDrawer } from '@/components/common/Drawers';
import { getUserInfo } from '@/redux/selector/auth.selector';

type ProductDetailProps = {
  art: ArtItem;
  vendorId: number;
  artistId: number;
  artPrice: number;
  basePrice: number;
  title: string;
  aboutArt: string;
  image_path: string;
  authorName: string;
  authorImg: string;
  flagUrl: string;
  country: string;
  artId: number;
  total_favorite: number;
  total_avg_rating: number;
  total_reviews: number;
  isNotSoldAble: boolean;
  size: elementType;
  medium: elementType;
  material: elementType;
};

const ProductDetail = ({
  art,
  vendorId,
  artistId,
  artId,
  artPrice,
  basePrice,
  title,
  aboutArt,
  image_path,
  authorName,
  authorImg,
  country,
  flagUrl,
  total_favorite,
  total_avg_rating,
  total_reviews,
  size,
  material,
  medium,
  isNotSoldAble
}: ProductDetailProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = getUserInfo();
  const carts = useAppSelector(getCartList);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [cartDrawerState, setCartDrawerState] = useState<boolean>(false);
  const [addItemToOrder, { isLoading, isSuccess }] = useAddItemToOrderMutation({});

  const addToCartHandler = () => {
    if (Array.isArray(carts) && carts?.length < 1) {
      dispatch(
        addToCart({
          artId: artId,
          qty: 1,
          image_path: image_path,
          regular_price: artPrice,
          title: title,
          vendorId: vendorId
        })
      );
    } else {
      if (carts) {
        console.log(vendorId, carts, carts[0]?.vendorId === vendorId, 'ADD TO CART');
        const isAvailableVendor = carts?.every((cart: cartType) => cart?.vendorId === vendorId);
        const isSameArt = carts?.some((cart: cartType) => cart?.artId === artId);
        if (isAvailableVendor) {
          if (isSameArt) {
            Swal.fire({
              icon: 'info',
              text: 'Adding More Than One Quantity Of The Same Artwork To Your Cart Is Prohibited.',
              customClass: {
                htmlContainer: 'font-medium text-sm text-gray',
                confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
              }
            });
          } else {
            dispatch(
              addToCart({
                artId: artId,
                qty: 1,
                image_path: image_path,
                regular_price: artPrice,
                title: title,
                vendorId: vendorId
              })
            );
          }
        } else {
          Swal.fire({
            icon: 'info',
            text: 'You Can Only Add Artwork From A Particular Artist.',
            customClass: {
              htmlContainer: 'font-medium text-sm text-gray',
              confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
            }
          });
        }
      }
    }
    setCartDrawerState(true);
  };

  const buyNowHandler = () => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      const isAvailableVendor = carts?.every((cart: cartType) => cart?.vendorId === vendorId);
      const isSameArt = carts?.some((cart: cartType) => cart?.artId === artId);

      if (isAvailableVendor) {
        if (isSameArt) {
          Swal.fire({
            icon: 'info',
            text: 'Adding More Than One Quantity Of The Same Artwork To Your Cart Is Prohibited.',
            customClass: {
              htmlContainer: 'font-medium text-sm text-gray',
              confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
            }
          });
        } else {
          addItemToOrder({
            items: [artId],
            session_id: getUserSessionId(),
            quantities: [1]
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          text: 'You Can Only Add Artwork From A Particular Artist.',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('carts');
      router.push('/checkout');
    }
  }, [isSuccess, router]);

  return (
    <section className="productDetailSection pt-5 pb-20">
      <Wrapper>
        <BreadCrumb parentPage="All Arts" currentPage={title} />

        <div className="productDetailWrapper flex gap-8 flex-col items-center lg:flex-row lg:items-stretch">
          <div className="art-gallery w-full lg:w-1/2 relative">
            {image_path ? (
              <ArtGallery
                image_path={image_path}
                itemId={artId}
                itemLabel={art?.item_label_by_system}
                totalFavorite={total_favorite}
                artistId={artistId}
                vendorId={vendorId}
              />
            ) : (
              <UploadLoader />
            )}
          </div>
          <div className="art-details w-full lg:w-1/2 px-4 py-4 sm:px-6 sm:py-9">
            <ArtMetaDetails
              total_favorite={total_favorite}
              total_avg_rating={total_avg_rating}
              total_reviews={total_reviews}
            />
            <ArtDetail
              aboutArt={aboutArt}
              authorImg={authorImg}
              authorName={authorName}
              artistId={art?.mainOwner?.id}
              title={title}
              country={country}
              flagUrl={flagUrl}
              fb_url={art?.mainOwner?.facebook_url || ''}
              twitter_url={art?.mainOwner?.twitter_url || ''}
              insta_url={art?.mainOwner?.instagram_url || ''}
              youtube_url={art?.mainOwner?.linkedin_url || ''}
            />
            <Feature
              size={size?.name}
              material={material?.name}
              medium={medium?.name}
              isNotSoldAble={isNotSoldAble}
            />
            <ArtPrice price={artPrice} basePrice={basePrice} />
            <div className="w-full">
              {artId !== undefined && <PriceShortChart itemId={artId} />}
            </div>

            <div className="flex justify-between gap-3 sm:gap-6 mt-5 sm:mt-3 flex-col sm:flex-row">
              {!isNotSoldAble && (user?.id !== vendorId || user?.id !== artistId) ? (
                <>
                  <Button
                    className="flex flex-1 justify-center !bg-black !py-3 !px-8 text-white gap-2 font-bold text-sm"
                    onClick={addToCartHandler}
                    disabled={isNotSoldAble}
                  >
                    <Icon name="cart" color="white" size="17" /> Add To Cart
                  </Button>
                  <Button
                    className="flex flex-1 justify-center !py-3 !px-8 text-white gap-2 font-bold text-sm"
                    onClick={buyNowHandler}
                    disabled={isLoading || isNotSoldAble}
                  >
                    Buy Now
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </Wrapper>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      <CartItemDrawer
        drawerState={cartDrawerState}
        closeDrawer={() => setCartDrawerState(!cartDrawerState)}
      />
    </section>
  );
};

export default ProductDetail;
