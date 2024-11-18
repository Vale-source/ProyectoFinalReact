import { IImagen } from "../types/IImagen";
import { BackendClient } from "./BackendClient";

export class ImagesServices extends BackendClient<IImagen> {
  async uploadImage(file: File): Promise<IImagen> {
    const formData = new FormData();
    formData.append("uploads", file);
    console.log("FormData contents:", formData.get("uploads")); // Verificar que el archivo esté en FormData

    const response = await fetch(`${this.baseUrl}/uploads`, {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status); // Verificar el código de estado
    if (!response.ok) {
      console.error("Error response:", response); // Verificar información adicional sobre el error
      throw new Error("Error al subir la imagen");
    }

    const textData = await response.text();
    console.log("Response text:", textData); // Verificar el contenido de la respuesta

    const data = textData.startsWith("{")
      ? JSON.parse(textData)
      : { url: textData, name: "generatedPublicId" };
    
    console.log("Parsed data:", data); // Verificar que los datos se hayan parseado correctamente

    return { name: data.name, url: data.url };
  }
}

