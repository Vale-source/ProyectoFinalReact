import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { BackendClient } from "./BackendClient";


export class CompanyServices extends BackendClient<IEmpresa | ICreateEmpresaDto | IUpdateEmpresaDto> {

	async getAllCompany(): Promise<IEmpresa[]> {
		const response = await fetch(`${this.baseUrl}`);
		const data = await response.json();
		return data as IEmpresa[];
	}

	async createCompany(data: ICreateEmpresaDto): Promise<IEmpresa> {
		const response = await fetch(`${this.baseUrl}`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		});
		const newData = await response.json();
		return newData ;
	  }

}
