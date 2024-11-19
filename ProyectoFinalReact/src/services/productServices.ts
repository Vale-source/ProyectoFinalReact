import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IProductos } from "../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
import { BackendClient } from "./BackendClient";

export class ProductServices extends BackendClient<ICreateProducto | IProductos | IUpdateProducto> {

    async createProduct(data: ICreateProducto): Promise<IProductos> {
		const response = await fetch(`${this.baseUrl}/create`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData ;
	  }


      async updateProduct(id: number, data: IUpdateProducto) {
		await fetch(`${this.baseUrl}/update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

	}

    async getAllProductsForBranch(id: number): Promise<IProductos[]> {
		const response = await fetch(`${this.baseUrl}/porSucursal/${id}`);
		const data = await response.json();
		return data as IProductos[];
	}

	async getPagedProductsForBranch(idSucursal: number, page: number, size: number) {
		const response = await fetch(`${this.baseUrl}/pagedPorSucursal/${idSucursal}?page=${page}&size=${size}`);
		if (!response.ok) {
		  throw new Error("Error al obtener los productos paginados");
		}
		const data = await response.json();
		return data
	  }
}