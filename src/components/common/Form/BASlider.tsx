/* eslint-disable no-unused-vars */
import { ConfigProvider, Slider, Space } from 'antd';
import { SliderMarks, SliderRangeProps } from 'antd/es/slider';

export type SliderType = {
  onChange: (value: any) => void;
  value: number | number[];
  min: number;
  max: number;
  step: number | null;
  range: boolean;
  dots: boolean;
  showMarks: boolean;
};

const marks: SliderMarks = {
  0: '0',
  2000: '2000',
  4000: '4000',
  6000: '6000',
  8000: '8000',
  10000: '10000'
};

const BASlider = ({
  onChange,
  value,
  min,
  max,
  range,
  step,
  dots,
  showMarks
}: SliderRangeProps & { showMarks?: boolean }) => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        // Alias Token
      },
      components: {
        Slider: {
          trackBg: '#FF6F61',
          trackBgDisabled: '#FF6F61',
          trackHoverBg: '#FF6F61',
          handleColor: '#FF6F61',
          handleActiveColor: '#FF6F61',
          dotBorderColor: '#FF6F61',
          dotActiveBorderColor: '#FF6F61',
          colorPrimaryBorderHover: '#FF6F61',
          colorFillContentHover: '#FF6F61',
          controlSize: 20
        }
      }
    }}
  >
    {showMarks ? (
      <Slider
        min={min}
        max={max}
        step={step}
        range={range}
        value={value}
        dots={dots}
        onChange={onChange}
        marks={marks}
        className="w-full"
      />
    ) : (
      <Slider
        min={min}
        max={max}
        step={step}
        range={range}
        value={value}
        dots={dots}
        onChange={onChange}
        className="w-full"
      />
    )}
  </ConfigProvider>
);

export default BASlider;
