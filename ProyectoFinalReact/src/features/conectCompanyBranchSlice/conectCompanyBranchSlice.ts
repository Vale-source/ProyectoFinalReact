import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPropsEmpresas } from "../../features/asideSlice/asideSlice";
import { Sucursal } from "../sucursalSlice/sucursalesSlice";
const initialState: IPropsEmpresas = {
	id: "",
	name: "",
	socialReason: "",
	cuit: 0,
	image: "",
	sucursales: [],
};

const conectCompanyBranchSlice = createSlice({
	name: "conect",
	initialState,
	reducers: {
		editNavbar: (state, action: PayloadAction<IPropsEmpresas>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.sucursales = action.payload.sucursales;
		},
		editBranchForCompany: (state, action: PayloadAction<Sucursal>) => {
            const branch = action.payload;

            // Generador de IDs
            function* getId(lastID: number = 0): Generator<number> {
                let ID = lastID;
                while (true) {
                    ID++;
                    yield ID;
                }
            }

            const idGenerator = getId(state.sucursales.length > 0 ? Math.max(...state.sucursales.map(s => s.id)) : 0);
            const branchWithId = {
                ...branch,
                id: branch.id || idGenerator.next().value,
            };

            // Buscar la sucursal por su ID
            const index = state.sucursales.findIndex(
                (sucursal) => sucursal.id === branchWithId.id
            );

            if (index !== -1) {
                // Si la sucursal existe, la actualizamos
                state.sucursales[index] = branchWithId;
            } else {
                // Si la sucursal no existe, la agregamos
                state.sucursales.push(branchWithId);
            }
        },
	},
});

export const { editNavbar, editBranchForCompany } =
	conectCompanyBranchSlice.actions;
export default conectCompanyBranchSlice;
