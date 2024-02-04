import { apiSlice } from '@/redux/apiSlice';

export const filterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/category/detail',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getPopularCategories: builder.query({
      query: () => ({
        url: '/category/popular',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getMaterials: builder.query({
      query: () => ({
        url: '/all/metarial',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getTags: builder.query({
      query: () => ({
        url: '/all/tags',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getSubjects: builder.query({
      query: () => ({
        url: '/all/subjects',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getMediums: builder.query({
      query: () => ({
        url: '/all/medium',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getSizes: builder.query({
      query: () => ({
        url: '/all/size',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })
});

export const {
  useGetTagsQuery,
  useGetCategoriesQuery,
  useGetPopularCategoriesQuery,
  useGetMaterialsQuery,
  useGetMediumsQuery,
  useGetSizesQuery,
  useGetSubjectsQuery
} = filterApi;
