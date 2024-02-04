export type OptionType = {
  value: number | string;
  label: string;
};

export type ArtUploadValueType = {
  item_name: string;
  regular_price: string;
  item_desc: string;
  item_shortdesc: string;
  size_id: string;
  medium_id: string;
  material_id: string;
  subject_id: string;
  item_tags: OptionType[] | string;
  item_category: string;
  is_adult: boolean;
};
