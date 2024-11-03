import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface ConectState {
    activeCompany: IEmpresa | null;
    activeBranch: ISucursal | null;
    sucursales: ISucursal[];
}

const initialState: ConectState = {
    activeCompany: null,
    activeBranch: null,
    sucursales: [],
};

const conectCompanyBranchSlice = createSlice({
    name: "conect",
    initialState,
    reducers: {
        setActiveCompany: (state, action: PayloadAction<IEmpresa | null>) => {
            state.activeCompany = action.payload;
        },
        setActiveBranch: (state, action: PayloadAction<ISucursal | null>) => {
            state.activeBranch = action.payload;
        },
        setSucursales: (state, action: PayloadAction<ISucursal[]>) => {
            state.sucursales = action.payload;
        },
        addSucursal: (state, action: PayloadAction<ISucursal>) => {
            state.sucursales.push(action.payload);
        },
        updateSucursal: (state, action: PayloadAction<ISucursal>) => {
            const index = state.sucursales.findIndex(sucursal => sucursal.id === action.payload.id);
            if (index !== -1) {
                state.sucursales[index] = action.payload;
            }
        },
    },
});

export const { setActiveCompany, setActiveBranch, setSucursales, addSucursal, updateSucursal } = conectCompanyBranchSlice.actions;
export default conectCompanyBranchSlice.reducer;