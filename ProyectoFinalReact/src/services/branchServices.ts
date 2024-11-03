import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";

export class BranchServices extends BackendClient<ISucursal | IUpdateSucursal | ICreateSucursal> {
	async createBranch(data: ICreateSucursal): Promise<ISucursal> {
		try {
		  console.log("Datos enviados a createBranch:", data); // Agrega este log para depurar los datos
	
		  const response = await fetch(`${this.baseUrl}/create`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		  });
	
		  if (!response.ok) {
			console.log(data)
			// Manejar errores de respuesta del servidor
			const errorData = await response.json();
			console.error("Error en la respuesta del servidor:", errorData);
			throw new Error(`Error en la creación de la sucursal: ${response.statusText}`);
		  }
	
		  const newData = await response.json();
		  return newData;
		} catch (error) {
		  // Manejar errores de red o de otro tipo
		  console.error("Error en la solicitud de creación de sucursal:", error);
		  throw new Error("No se pudo crear la sucursal. Por favor, inténtelo de nuevo más tarde.");
		}
	  }

  async updateBranch(id: number, data: IUpdateSucursal): Promise<ISucursal> {
    try {
        const response = await fetch(`${this.baseUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la respuesta del servidor:", errorData);
            throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
        }

        const newData = await response.json();
        return newData as ISucursal;
    } catch (error) {
        console.error("Error updating branch:", error);
		if (error instanceof Error) {
			throw new Error(`Failed to update branch: ${error.message}`);
		} else {
			throw new Error('Failed to update branch: Unknown error');
		}
    }
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

