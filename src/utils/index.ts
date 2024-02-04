import Cookies from 'js-cookie';
import moment from 'moment';

export const countLike = (like: number) => {
  if (like < 1000) {
    return like?.toString();
  } else if (like < 1000000) {
    if (like % 1000 === 0) {
      return like / 1000 + 'K';
    }
    return (like / 1000).toFixed(1) + 'K';
  } else {
    return (like / 1000000).toFixed(1) + 'M';
  }
};

export const moneyFormat = (
  arg: number,
  useollarSign: boolean = true,
  currency: string = 'USD',
  fraction: number = 2
) => {
  const numberFormat = Intl.NumberFormat('en-US', {
    currency: currency || 'USD',
    style: 'currency',
    minimumFractionDigits: fraction,
    currencyDisplay: useollarSign ? 'symbol' : 'code'
  }).format(arg);

  if (!useollarSign) {
    const usd = numberFormat.slice(0, 3);
    const dollar = numberFormat.slice(4);
    return `${dollar} ${usd}`;
  }

  return numberFormat;
};

export const getUserSessionId = () => Cookies.get('USER_SESSION_ID');

export const getUniqueId = () =>
  `${new Date().getTime().toString(16)} - ${Math.random().toString(16).substring(2, 4)}`;

export const addZero = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = addZero(d.getMonth() + 1);
  const day = addZero(d.getDate());
  // const hour = addZero(d.getHours());
  // const min = addZero(d.getMinutes());
  // const sec = addZero(d.getSeconds());
  // return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  return `${year}-${month}-${day}`;
};

export const shortTitle = (title: string) =>
  title?.length > 15 ? title.substring(0, 14) + '...' : title;

export const addDaysToCurrentDate = (daysToAdd: number) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysToAdd);
  return currentDate;
};

export const getObjectLength = (obj: any) => {
  let count = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
};

export const numberShort = (num: number) => {
  if (num > 999 && num <= 999999) {
    return `${(num / 1000).toFixed(2)}K`;
  } else if (num > 999999) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num <= 999) {
    return num.toFixed(2);
  }
};

export const reviewDate = (date: string) => {
  const new_date = new Date(date);
  const review_date = moment(new_date).format('DD MMMM YYYY');
  return review_date;
};

export const getTotalItems = (args: number) => {
  if (args > 1) {
    if (args > 100000) {
      return args.toLocaleString() + '+ Items';
    } else {
      return args.toLocaleString() + ' Items';
    }
  } else {
    return args + ' Item';
  }
};

export const getValidNumber = (args: number) => {
  return Number(args.toString().replace('e-', ''));
};

export const getReviewLabel = (reviewCount: number) => {
  return reviewCount > 1 ? `${reviewCount} Reviews` : `${reviewCount} Review`;
};
