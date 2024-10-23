import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sucursal {
    nombreSucursal: string
    selecPais: string
    selecLocalidad: string
    longitud: number
    timeAper: string;
    selcProvincia: string;
    latitud: number
    codigoPostal: number;
    timeCierre: string;
    nombreCalle: string;
    numeroCalle: number;
    numeroPiso: number;
    numeroDepartamento: number;
    urlImagen:string;
    habilitado: boolean;
}

const initialState: Sucursal[] = [];

const sucursalesSlice = createSlice({
    name: 'sucursales',
    initialState,
    reducers: {
        agregarSucursal: (state, action: PayloadAction<Sucursal>) => {
            state.push(action.payload);
        },
        actualizarSucursal: (state, action: PayloadAction<Sucursal>) => {
            const index = state.findIndex(sucursal => sucursal.nombreSucursal === action.payload.nombreSucursal);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
});

export const { agregarSucursal } = sucursalesSlice.actions;
export default sucursalesSlice.reducer;