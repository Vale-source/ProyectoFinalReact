import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPropsEmpresas {
	id: string;
	name: string;
	socialReason: string;
	cuit: number;
	image: string;
}

interface IPropsAside {
	value: IPropsEmpresas[];
}

const initialState: IPropsAside = {
	value: [],
};

const asideSlice = createSlice({
	name: "aside",
	initialState,
	reducers: {
		addCompany: (state, action: PayloadAction<IPropsEmpresas>) => {
			state.value.push(action.payload);
		},

		deleteCompany: (state, action: PayloadAction<IPropsEmpresas>) => {
			const companyFound = state.value.find(
				(company) => company.name === action.payload.name
			);

			if (companyFound) {
				state.value.splice(state.value.indexOf(companyFound), 1);
			}
		},
		
		editCompany: (state, action: PayloadAction<IPropsEmpresas>) => {
			const index = state.value.findIndex(
				(company) => company.id === action.payload.id
			);

			if (index !== -1) {
				state.value[index] = action.payload;
			}
		},
	},
});

export const { addCompany, deleteCompany, editCompany } = asideSlice.actions;

export default asideSlice;
