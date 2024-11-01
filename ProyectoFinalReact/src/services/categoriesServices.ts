import { ICategorias } from '../types/dtos/categorias/ICategorias';
import { ICreateCategoria } from '../types/dtos/categorias/ICreateCategoria';
import { IUpdateCategoria } from '../types/dtos/categorias/IUpdateCategoria';
import {BackendClient} from './BackendClient'


export class CategoriesServices extends BackendClient <ICategorias | ICreateCategoria | IUpdateCategoria> {

    async getAllCategoriesForCompany(id: number): Promise<ICategorias[]> {
		const response = await fetch(`${this.baseUrl}/allCategoriasPorEmpresa/${id}`);
		const data = await response.json();
		return data as ICategorias[];
	}

    async getAllCategoriesForBranch(id: number): Promise<ICategorias[]> {
		const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${id}`);
		const data = await response.json();
		return data as ICategorias[];
	}    

    async updateCategory(id: number, data: IUpdateCategoria): Promise<ICategorias> {
		const response = await fetch(`${this.baseUrl}/update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData as ICategorias;
	}

    async createCategory(data: ICreateCategoria): Promise<ICategorias> {
		const response = await fetch(`${this.baseUrl}/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData as ICategorias;
	}

}