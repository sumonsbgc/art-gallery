import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'black-default': '#000', // rgb(0, 0, 0)
        'black-default-10': '#0000001A', // rgb(0, 0, 0, 0.10)
        black: '#111111', // rgb(17, 17, 17)
        cyan: '#2BB4BD', // rgb(43, 180, 189)
        white: '#FFFFFF', // rgb(255, 255, 255)
        white2: '#FEFFFF', // rgb(254, 255, 255)
        gray: '#8E8E8E', // rgb(142, 142, 142)
        gray2: '#B4B4B4', // rgb(180, 180, 180)
        gray3: '#F6F5F5', // rgb(246, 245, 245)
        gray4: '#767676', // rgb(118, 118, 118)
        gray5: '#8C8C8C', // rgb(140, 140, 140)
        gray6: '#848484', // rgb(132, 132, 132)
        gray7: '#868686', // rgb(134, 134, 134)
        gray8: '#E0DEDE', // rgb(224, 222, 222)
        gray9: '#AEAEAE', // rgb(174, 174, 174)
        lightgray: '#A0A0A0', // rgb(160, 160, 160)
        lightgray2: '#CDCDCD', // rgb(205, 205, 205)
        lightgray3: '#AFAFAF', // rgb(175, 175, 175)
        lightgray4: '#E6E6E6', // rgb(230, 230, 230)
        orange: '#FF6F61', // rgb(255, 111, 97)
        orange2: '#FF6356', // rgb(255, 99, 86)
        'light-orange': '#F89828', // rgb(248, 152, 40)
        'light-orange2': '#FFF4F3', // rgb(255, 244, 243)
        red: '#FF2C2A', // rgb(255, 44, 42)
        red2: '#EA5455', // rgb(234, 84, 85)
        'light-red': '#FFECEC', // rgb(255, 236, 236)
        yellow: '#F6D008', // rgb(246, 208, 8)
        yellow2: '#FFA900', // rgb(255, 169, 0)
        green: '#00B94A', // rgb(0, 185, 74)
        green2: '#1FAF38', // rgb(31, 175, 56)
        green3: '#34B53A', // rgb(52, 181, 58)
        blue: '#1D9BF0', // rgb(255, 111, 97)
        blue2: '#1890FF' // rgb(24, 144, 255),
      },
      screens: {
        xs: '480px',
        '2xl': '1440px'
      }
    }
  },
  plugins: [require('daisyui')]
};

export default config;
