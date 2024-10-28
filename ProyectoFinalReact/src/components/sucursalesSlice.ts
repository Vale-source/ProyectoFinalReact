import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Sucursal {
    id: number;
    nombreSucursal: string;
    selecPais: string;
    selecLocalidad: string;
    longitud: number;
    timeAper: string;
    selcProvincia: string;
    latitud: number;
    codigoPostal: number;
    timeCierre: string;
    nombreCalle: string;
    numeroCalle: number;
    numeroPiso: number;
    numeroDepartamento: number;
    urlImagen: string;
    habilitado: boolean;
}

const initialState: Sucursal[] = [];
const generarId = (sucursales: Sucursal[]): number => {
    if (sucursales.length === 0) {
        return 1; // Si no hay sucursales, el ID es 1
    }
    const ultimoId = Math.max(...sucursales.map(sucursal => sucursal.id));
    return ultimoId + 1;
};

const sucursalesSlice = createSlice({
    name: 'sucursales',
    initialState,
    reducers: {
        
        agregarSucursal: (state: Sucursal[], action: PayloadAction<Sucursal>) => {
            // Generar un nuevo ID para la nueva sucursal
            const nuevoId = generarId(state);
            
            // Crear la nueva sucursal con el ID generado
            const nuevaSucursal = { ...action.payload, id: nuevoId };
            
            // Agregar la nueva sucursal al estado
            state.push(nuevaSucursal);
            
            // Log para verificar la nueva sucursal agregada
            console.log("Sucursal agregada:", nuevaSucursal);
        },
        actualizarSucursal: (state: Sucursal[], action: PayloadAction<Sucursal>) => {
            // Log del estado actual de sucursales
            console.log("Estado actual de sucursales:", state);
    
            // Log del payload recibido
            console.log("Sucursal del payload:", action.payload);
    
            // Buscar la sucursal en el array por el id
            const index = state.findIndex(sucursal => sucursal.id === action.payload.id);
    
            // Log para verificar el índice encontrado
            console.log("Index encontrado: ", index);
    
            // Si se encuentra la sucursal, actualizarla
            if (index !== -1) {
                state[index] = action.payload;
                console.log("Sucursal actualizada en el estado: ", state[index]);
            } else {
                // Si no se encuentra la sucursal, crear una nueva con un nuevo ID
                const nuevoId = generarId(state);
                const nuevaSucursal = { ...action.payload, id: nuevoId };
                state.push(nuevaSucursal);
                console.log("Nueva sucursal agregada:", nuevaSucursal);
            }
        }
    }
})

export const { agregarSucursal, actualizarSucursal } = sucursalesSlice.actions;
export default sucursalesSlice.reducer;