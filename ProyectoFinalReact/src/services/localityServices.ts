import { ILocalidad } from "../types/ILocalidad";
import { BackendClient } from "./BackendClient";

export class LocalityServices extends BackendClient<ILocalidad>{


        //AGREGAR /localidades A LA URL PARA USAR METODO GETALL
        async getAllLocalitiesByProvince(id: number): Promise<ILocalidad[]> {
            const response = await fetch(`${this.baseUrl}/findByProvincia/${id}`);
            const data = await response.json();
            return data as ILocalidad[];
        }
}