import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { contactsReducers } from "./contactsSlice";
import { filtersReducer } from "./filtersSlise";


const persistConfig = {
  key: 'contacts',
  storage,
}
const persistedNamesReducer = persistReducer(persistConfig,contactsReducers )



export const store = configureStore({
    reducer: {
        contacts: persistedNamesReducer,
        filters: filtersReducer, 
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

export const persistor = persistStore(store)