import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// types
import {
  ArtistOrdersData,
  ArtistSalesAnalytics,
  DisburseAnalytics,
  OrderType,
  SingleReviewDetails,
  WithdrawData
} from './artist.types';

export type ArtistState = {
  allOrdersData: ArtistOrdersData;
  analytics: ArtistSalesAnalytics;
  singleOrder: OrderType;
  disburseAnalytics: DisburseAnalytics;
  withdraws: WithdrawData;
  singleReviewDetails: SingleReviewDetails;
};

const initialState: ArtistState = {
  allOrdersData: {
    current_page: 0,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: [],
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0
  },
  analytics: {
    deliverOrder: 0,
    pendingOrder: 0,
    totalIncome: 0
  },
  singleOrder: {
    id: 0,
    order_id: '',
    order_email: '',
    order_country: '',
    order_address: '',
    order_city: '',
    order_zipcode: '',
    order_notes: null,
    payment_status: '',
    contact: '',
    state: '',
    shipping_status: 0,
    shipping_time: null,
    delivery_status: 0,
    delivery_time: null,
    refund_status: 0,
    refund_time: null,
    cancel_status: 0,
    cancel_time: '',
    quantity: 0,
    unique_order_id: '',
    grand_total: 0,
    // @ts-ignore
    ItemOrder: {},
    actual_owner: {
      id: 0,
      name: '',
      user_photo: '',
      image_path: ''
    },
    buyer: {
      id: 0,
      name: '',
      user_photo: null
    }
  },
  disburseAnalytics: {
    withdraw_option: [],
    totalReceived: 0,
    totalDue: 0,
    totalSell: 0,
    adminCommission: 0,
    myCommission: 0
  },
  withdraws: {
    current_page: 0,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: [],
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0
  },
  singleReviewDetails: {
    review_detail: {
      id: 0,
      item_id: {
        item_id: 0,
        item_name: '',
        item_slug: '',
        item_desc: '',
        item_shortdesc: '',
        item_thumbnail: '',
        item_preview: '',
        item_file: '',
        regular_price: 0,
        item_tags: '',
        item_featured: '',
        is_adult: 0,
        avg_critic_rating: 0,
        avg_customer_rating: null,
        total_favorite: 0,
        image_path: '',
        sale_status: 0,
        total_avg_rating: 0,
        total_review: 0,
        review_opinion: 0
      },
      userDetail: {
        id: 0,
        name: '',
        email: '',
        user_type: '',
        user_photo: '',
        first_name: '',
        last_name: '',
        image_path: ''
      },
      review: '',
      rating: 0,
      review_date: '',
      type: null
    },
    avg_rating: 0,
    total_review: 0,
    total_like: 0
  }
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    updateOrderStatus: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      const { allOrdersData } = state;
      const { data: orders } = allOrdersData;
      const index = orders.findIndex((order) => order.chout_id === data.chout_id);
      if (index !== -1) {
        orders[index] = data;
      }
      state.allOrdersData = { ...allOrdersData, data: orders };
    },
    setOrders: (state, action: PayloadAction<any>) => {
      const { data, pendingOrder, deliverOrder, totalIncome } = action.payload;
      state.allOrdersData = data;
      state.analytics = {
        pendingOrder,
        deliverOrder,
        totalIncome
      };
    },
    setSingleOrder: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.singleOrder = data;
    },
    setDisburseAnalytics: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.disburseAnalytics = data;
    },
    setWithdraws: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.withdraws = data;
    },
    setSingleReviewDetails: (state, action: PayloadAction<any>) => {
      const { review_detail, avg_rating, total_review, total_like } = action.payload;
      state.singleReviewDetails = { review_detail, avg_rating, total_review, total_like };
    }
  }
});

export const {
  updateOrderStatus,
  setOrders,
  setSingleOrder,
  setDisburseAnalytics,
  setWithdraws,
  setSingleReviewDetails
} = artistSlice.actions;
export default artistSlice.reducer;
