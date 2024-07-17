import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './users/slice';


const persistanceMiddleware = (store) => (next)=> (action)=> {
    next(action)
    localStorage.setItem('__reduce__state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch