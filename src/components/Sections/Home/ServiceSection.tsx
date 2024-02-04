// components
import { Grid, Text } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

// data
import { productService } from '@/data/home';

const ServiceSection = () => {
  return (
    <section className="service-section">
      <Wrapper>
        <Grid className="service-wrapper max-w-[1120px] mx-auto gap-[60px] sm:gap-8">
          {productService.map((item) => (
            <div
              className="flex flex-col items-center w-[290px] text-center mx-auto"
              key={item.title}
            >
              <Icon name={item.icon} color="white" size="70" />
              <h3 className="text-white text-xl mt-5 mb-4">{item.title}</h3>
              <Text className="text-white italic">{item.description}</Text>
            </div>
          ))}
        </Grid>
      </Wrapper>
    </section>
  );
};

export default ServiceSection;
