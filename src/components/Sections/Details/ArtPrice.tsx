import { Text, Title } from '@/components/common';
import { moneyFormat } from '@/utils';

type ArtPriceProps = {
  price: number;
  basePrice: number;
};

const ArtPrice = ({ price, basePrice }: ArtPriceProps) => {
  return (
    <div className="w-full flex justify-between gap-2 mb-2">
      <p className="text-[16px] italic font-[400] text-[#0F0F0F]">CURRENT PRICE</p>
      <div className="flex items-end flex-col">
        <Title
          content={moneyFormat(price, false)}
          className="text-[20px] sm:!text-2xl font-[600]"
        />
        <Text>
          Initial Price{' '}
          <span className="text-[#898888] font-medium italic">{moneyFormat(basePrice, false)}</span>
        </Text>
      </div>
    </div>
  );
};

export default ArtPrice;
