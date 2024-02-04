/* eslint-disable no-unused-vars */
import { ConfigProvider, Space, Switch } from 'antd';
import React from 'react';

export type Switch = {
  onChange: (checked: boolean) => void;
  checked: boolean;
};

const BASwitch = ({ onChange, checked }: Switch) => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        // Alias Token
      },
      components: {
        Switch: {
          colorPrimary: '#FF6F61',
          colorPrimaryBorder: '#FF6F61',
          colorPrimaryHover: '#FF6F61',
          colorBgContainer: '#FF6F61',
          colorPrimaryBgHover: '#fff',
          colorText: '#FF6F61',
          fontSize: 12,
          fontFamily: 'inherit',
          fontWeightStrong: 600
        }
      }
    }}
  >
    <Space>
      <Switch
        className="va-switch !h-8 py-[5px] bg-white border border-solid border-orange text-orange font-medium capitalize"
        checkedChildren="Start Selling"
        unCheckedChildren="Stop Selling"
        onChange={onChange}
        checked={checked}
      />
    </Space>
  </ConfigProvider>
);

export default BASwitch;
