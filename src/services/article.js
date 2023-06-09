import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://article-extractor-and-summarizer.p.rapidapi.com/';
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// how many paragraphs to return
const RESULTS_LENGTH = 3;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', RAPID_API_KEY);
            headers.set(
                'X-RapidAPI-Host',
                'article-extractor-and-summarizer.p.rapidapi.com'
            );

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getArticle: builder.query({
            query: (params) =>
                `/summarize?url=${encodeURIComponent(
                    params.url
                )}&length=${RESULTS_LENGTH}`,
        }),
    }),
});

export const { useLazyGetArticleQuery } = articleApi;
