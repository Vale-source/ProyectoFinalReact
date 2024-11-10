import { IProvincia } from "../types/IProvincia";
import { BackendClient } from "./BackendClient";

export class ProvinceServices extends BackendClient<IProvincia> {


    //AGREGAR /provincias A LA URL PARA USAR METODO GETALL
    async getAllProvincesByCountry(id: number): Promise<IProvincia[]> {
		const response = await fetch(`${this.baseUrl}/findByPais/${id}`);
		const data = await response.json();
		return data as IProvincia[];
	}
}