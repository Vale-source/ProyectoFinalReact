import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sucursal } from "../sucursalSlice/sucursalesSlice";

export interface IPropsEmpresas {
	id: string;
	name: string;
	socialReason: string;
	cuit: number;
	image: string;
	sucursales: Sucursal[];
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

		deleteCompany: (state, action: PayloadAction<{ id: string }>) => {
			const index = state.value.findIndex(
				(company) => company.id === action.payload.id
			);

			if (index !== -1) {
				state.value.splice(index, 1);
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
		setBranch: (
			state,
			action: PayloadAction<{ companyId: string; branch: Sucursal }>
		) => {
			const { companyId, branch } = action.payload;

			// Generador de IDs
			function* getId(lastID: number = 0): Generator<number> {
				let ID = lastID;
				while (true) {
					ID++;
					yield ID;
				}
			}

			const idGenerator = getId(
				Math.max(
					...state.value.flatMap((company) =>
						company.sucursales.map((s) => s.id)
					),
					0
				)
			);

			// No sobrescribimos el id si ya existe
			const branchWithId = {
				...branch,
				id: branch.id || idGenerator.next().value, // Usar el id existente si lo tiene, o generar uno nuevo si es una nueva sucursal
			};

			const company = state.value.find((company) => company.id === companyId);

			if (company) {
				const branchIndex = company.sucursales.findIndex(
					(suc) => suc.id === branchWithId.id
				);

				if (branchIndex !== -1) {
					// Actualizamos la sucursal si ya existe
					console.log("updateBranch");
					company.sucursales[branchIndex] = branchWithId;
				} else {
					// Agregamos la sucursal si no existe
					console.log("BranchIndex");
					company.sucursales.push(branchWithId);
				}
			}
		},
	},
});

export const { addCompany, deleteCompany, editCompany, setBranch } =
	asideSlice.actions;

export default asideSlice;
