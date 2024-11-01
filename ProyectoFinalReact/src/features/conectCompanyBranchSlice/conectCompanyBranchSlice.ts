import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface ConectState {
    activeCompany: IEmpresa | null;
    activeBranch: ISucursal | null;
}

const initialState: ConectState = {
    activeCompany: null,
    activeBranch: null,
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
    },
});

export const { setActiveCompany, setActiveBranch } =
    conectCompanyBranchSlice.actions;
export default conectCompanyBranchSlice.reducer;