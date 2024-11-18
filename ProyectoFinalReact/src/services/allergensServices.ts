import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

export class AllergensServices extends BackendClient<IAlergenos | ICreateAlergeno | IUpdateAlergeno> {

    async createAllergen(allergenData: ICreateAlergeno): Promise<IAlergenos> {
		const response = await fetch(`${this.baseUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(allergenData),
		});

		if (!response.ok) {
			throw new Error("Error al crear el alérgeno");
		}

		return await response.json();
	}

    async getAllAllergens(): Promise<IAlergenos[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IAlergenos[];
    }
    
}