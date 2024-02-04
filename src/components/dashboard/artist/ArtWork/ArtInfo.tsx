import { Text, Title } from '@/components/common';
import { moneyFormat } from '@/utils';

type ArtInfoType = {
  title: string;
  size: string;
  price: number;
  about: string;
  dimensions: string;
};

const ArtInfo = ({ title, size, price, about, dimensions }: ArtInfoType) => {
  return (
    <div className="py-9">
      <div className="flex justify-between w-full mb-12 overflow-hidden">
        <div className="">
          <Title content="ART TITLE" className="uppercase" />
          <Text>{title}</Text>
        </div>
        <div className="">
          <Title content="SIZE" className="uppercase" />
          {/* <Text>20.3 W x 25.4 H x 0.3 D cm</Text> */}
          <Text>{size}</Text>
        </div>
        <div className="">
          <Title content="price" className="uppercase" />
          <Text>{moneyFormat(price)}</Text>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="mb-12">
          <Title content="About Art" className="uppercase" />
          <Text>{about}</Text>
        </div>
        <div className="mb-12">
          <Title content="Details & Dimensions" className="uppercase" />
          <ul>
            <li>
              <Text>{dimensions}</Text>
              {/* <Text>Print: Giclee on Fine Art Paper</Text>
              <Text>Size: 20.3 W x 25.4 H x 0.3 D cm</Text>
              <Text>Size with Frame: 25.25 W x 30.25 H x 3 D cm</Text>
              <Text>Frame: White</Text>
              <Text>Ready to Hang: Yes</Text>
              <Text>Packaging: Ships in a Box</Text> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtInfo;
