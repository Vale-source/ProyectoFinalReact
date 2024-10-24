import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComponenteState {
  componenteActual: string | null;
}

const initialState: ComponenteState = {
  componenteActual: null,
};

const componenteSlice = createSlice({
  name: 'componente',
  initialState,
  reducers: {
    setComponenteActual: (state, action: PayloadAction<string>) => {
      state.componenteActual = action.payload;
    },
  },
});

export const { setComponenteActual } = componenteSlice.actions;
export default componenteSlice.reducer;
