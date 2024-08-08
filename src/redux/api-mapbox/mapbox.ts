import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accessToken = 'pk.eyJ1IjoidGVybW94aW4iLCJhIjoiY2w0NjdhOHgxMDVtcTNjbjIwdWxjZHVsdCJ9.-RRQ9TZ9JdX8wkZfsOKq5g'

export interface IResponseItem {
    id: string,
    properties: {
        name: string,
        full_address: string,
        mapbox_id: string
    }
}


export const mapboxApi = createApi({
    reducerPath: 'mapBoxApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.mapbox.com/search/geocode/v6/forward` }),
    endpoints: (builder) => ({
        getDataByText: builder.query<IResponseItem[], string>({
            query: (text) => {
                return `?access_token=${accessToken}&q=${text}`
            },
            transformResponse: (rawResult: { features: IResponseItem[] }) => {
                return rawResult.features
            }
        })
    })
})


export const { useGetDataByTextQuery } = mapboxApi


