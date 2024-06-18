import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersReducer from './usersSlice';
import tasksReducer from './tasksSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const usersPersistConfig = {
  key: 'users',
  storage,
};

const tasksPersistConfig = {
  key: 'tasks',
  storage,
};

const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    tasks: persistedTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
