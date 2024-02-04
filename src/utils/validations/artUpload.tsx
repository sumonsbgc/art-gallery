import * as Yup from 'yup';
export const ArtUploadSchema = Yup.object().shape({
  item_name: Yup.string()
    .max(100, 'Art Title can not exceed 100 characters')
    .required('Art Title is required field'),
  regular_price: Yup.string().required('Price is required field'),
  item_desc: Yup.string()
    .max(5000, 'About Art can not exceed 500 characters')
    .required('About Art is required field'),
  item_shortdesc: Yup.string()
    .max(5000, 'Details & Dimensions can not exceed 500 characters')
    .required('Details & Dimensions is required field'),
  size_id: Yup.string().required('Size is required field'),
  medium_id: Yup.string().required('Medium is required field'),
  material_id: Yup.string().required('Material is required field'),
  subject_id: Yup.string().required(' Subject is required field'),
  item_tags: Yup.array().required('Tag is required field').max(10, 'Tag can not be more than 10'),
  item_category: Yup.string().required('Item Category is required field')
});
