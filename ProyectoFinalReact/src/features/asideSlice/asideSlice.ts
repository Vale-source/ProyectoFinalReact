import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";

interface IinitialState {
	aside: IEmpresa[]; // Lista de empresas completas
	activeElement: null | IEmpresa; // Elemento activo es una empresa completa o null
}

const initialState: IinitialState = {
	aside: [],
	activeElement: null,
};

const asideSlice = createSlice({
	name: "aside",
	initialState,
	reducers: {
		setDataCompany(state, action: PayloadAction<IEmpresa[]>) {
			// Establece la lista completa de empresas
			state.aside = action.payload;
		},
	},
});

export const { setDataCompany } =
	asideSlice.actions;

export default asideSlice;
