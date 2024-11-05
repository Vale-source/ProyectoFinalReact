import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";

export class BranchServices extends BackendClient<
	ISucursal | IUpdateSucursal | ICreateSucursal
> {
	async createBranch(data: ICreateSucursal): Promise<ISucursal> {
		const response = await fetch(`${this.baseUrl}/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData;
	}

	async updateBranch(id: number, data: IUpdateSucursal): Promise<ISucursal> {
		const response = await fetch(`${this.baseUrl}/update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData as ISucursal;
	}

	async getAllBranchsByCompanyId(id: number): Promise<ISucursal[]> {
		const response = await fetch(`${this.baseUrl}/porEmpresa/${id}`);
		const data = await response.json();
		return data as ISucursal[];
	}

	async IsCasaMatriz(id: number): Promise<boolean> {
		const response = await fetch(`${this.baseUrl}/existCasaMatriz/${id}`);
		const data = await response.json();
		return data as boolean;
	}
}
