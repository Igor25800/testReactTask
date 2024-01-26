import {configureStore} from "@reduxjs/toolkit";
import modal from "./slices/modal";
import { apiTask} from "./services/taskApi";
import snackBar from "./slices/snackBar";

export interface InterfaceStore {

}

export const store = configureStore({
    reducer: {
        modal,
        snackBar,
        [apiTask.reducerPath]: apiTask.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiTask.middleware
    )
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;