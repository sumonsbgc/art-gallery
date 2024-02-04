import { useEffect, useState } from 'react';
import {
  useGetCategoriesQuery,
  useGetMaterialsQuery,
  useGetMediumsQuery,
  useGetSizesQuery,
  useGetSubjectsQuery,
  useGetTagsQuery
} from '@/redux/features/filters/filterApi';
import { filtersType } from '@/types/meta.type';

const useFilters = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<filtersType>({
    tags: [],
    cats: [],
    materials: [],
    sizes: [],
    mediums: [],
    subjects: []
  });

  const { data: tagDatas, isSuccess: tagIsSuccess } = useGetTagsQuery({}, {});
  const { data: catDatas, isSuccess: catIsSuccess } = useGetCategoriesQuery({}, {});
  const { data: sizeDatas, isSuccess: sizeIsSuccess } = useGetSizesQuery({}, {});
  const { data: subjectDatas, isSuccess: subjectIsSuccess } = useGetSubjectsQuery({}, {});
  const { data: mediumDatas, isSuccess: mediumIsSuccess } = useGetMediumsQuery({}, {});
  const { data: materialDatas, isSuccess: materialIsSuccess } = useGetMaterialsQuery({}, {});

  useEffect(() => {
    setIsLoading(true);
    if (tagIsSuccess) {
      if (Array.isArray(tagDatas?.data) && tagDatas?.data?.length > 0) {
        const tags = tagDatas?.data?.map((item: any) => ({ label: item?.name, value: item?.name }));
        setFilters((prevFilters) => ({ ...prevFilters, tags: tags }));
      }
    }

    if (catIsSuccess) {
      if (Array.isArray(catDatas?.data) && catDatas?.data?.length > 0) {
        const cats = catDatas?.data?.map((item: any) => ({
          label: item?.category_name,
          value: item?.cat_id
        }));
        setFilters((prevFilters) => ({ ...prevFilters, cats: cats }));
      }
    }

    if (sizeIsSuccess) {
      if (Array.isArray(sizeDatas?.data) && sizeDatas?.data?.length > 0) {
        const sizes = sizeDatas?.data?.map((item: any) => ({ label: item?.name, value: item?.id }));
        setFilters((prevFilters) => ({ ...prevFilters, sizes: sizes }));
      }
    }

    if (subjectIsSuccess) {
      if (Array.isArray(subjectDatas?.data) && subjectDatas?.data?.length > 0) {
        const subjects = subjectDatas?.data?.map((item: any) => ({
          label: item?.name,
          value: item?.id
        }));
        setFilters((prevFilters) => ({ ...prevFilters, subjects: subjects }));
      }
    }

    if (mediumIsSuccess) {
      if (Array.isArray(mediumDatas?.data) && mediumDatas?.data?.length > 0) {
        const mediums = mediumDatas?.data?.map((item: any) => ({
          label: item?.name,
          value: item?.id
        }));
        setFilters((prevFilters) => ({ ...prevFilters, mediums: mediums }));
      }
    }

    if (materialIsSuccess) {
      if (Array.isArray(materialDatas?.data) && materialDatas?.data?.length > 0) {
        const materials = materialDatas?.data?.map((item: any) => ({
          label: item?.name,
          value: item?.id
        }));
        setFilters((prevFilters) => ({ ...prevFilters, materials: materials }));
      }
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tagIsSuccess,
    catIsSuccess,
    sizeIsSuccess,
    subjectIsSuccess,
    mediumIsSuccess,
    materialIsSuccess
  ]);

  return { isLoading, filters };
};

export default useFilters;
