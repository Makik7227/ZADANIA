import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {PokemonSlice} from "./slices/PokemonSlice";
import {AppSlice} from "./slices/AppSlice";

export const store = configureStore({
  reducer: {
    pokemon: PokemonSlice.reducer,
    app: AppSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
