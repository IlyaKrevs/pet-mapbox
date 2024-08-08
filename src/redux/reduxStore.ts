import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mapboxApi } from "./api-mapbox/mapbox";

export const reduxStore = configureStore({
    reducer: {
        [mapboxApi.reducerPath]: mapboxApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(mapboxApi.middleware)
    }
})


setupListeners(reduxStore.dispatch)


export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch