import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IPropsEmpresas {
	name: string;
	socialReason: string;
	cuit: number;
	image: string | File | Blob;
}

interface IPropsAside {
	value: IPropsEmpresas[];
}

const initialState: IPropsAside = {
	value: [],
};

const asideSlice = createSlice({
	name: "companyState",
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
			const companyFound = state.value.find(
				(company) => company.name === action.payload.name
			);

			if (companyFound) {
				companyFound.name = action.payload.name;
				companyFound.socialReason = action.payload.socialReason;
				companyFound.cuit = action.payload.cuit;
				companyFound.image = action.payload.image;
			}
		},
	},
});

export const { addCompany, deleteCompany, editCompany } = asideSlice.actions;

export default asideSlice;
