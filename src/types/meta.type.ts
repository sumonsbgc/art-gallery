export type categoryType = {
  cat_id: number;
  category_name: string;
  category_slug: string;
  category_status: number;
  drop_status: string;
  image_path: string;
  menu_order: number;
};

export type CategoriesType = {
  categories: categoryType[];
};

export type PageProps = {
  slug: string;
};

export type FilterCats = {
  hot_seller?: number;
  most_like?: number;
  most_review?: number;
  top_rated?: number;
  top_hundred?: number;
  highly_appreciate?: number;
  fast_move?: number;
};

export type QueryParamsType = {
  global_search: string;
  filter_options: FilterCats;
  categories: number[];
  size_id: number[];
  rates: number[];
  minimum_price: string;
  maximum_price: string;
  lastday: string;
  sort_by: string;
};

export type ArtistsParamsType = {
  country_id: string;
  avg_art_price_min: string;
  avg_art_price_max: string;
  sort_by: string;
};

export type filterType = {
  value: number;
  label: string;
};

export type filtersType = {
  tags: filterType[];
  cats: filterType[];
  materials: filterType[];
  sizes: filterType[];
  mediums: filterType[];
  subjects: filterType[];
};

export type CustomToolTipType = {
  series: number[];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
};
