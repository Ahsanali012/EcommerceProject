import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { basketSlice } from "../Features/Basket/BasketSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import { catalogSlice } from "../Features/Catalog/CatalogSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["basket"],
  version: 1,
  devTools: process.env.NODE_ENV !== "production",
  storageSession,
};

const rootReducer = combineReducers({
  basket: basketSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  // reducer: {
  //   //Write all reducer here
  //   basket: basketSlice.reducer,
  // },
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
