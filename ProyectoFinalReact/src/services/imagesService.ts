import { IImagen } from "../types/IImagen";
import { BackendClient } from "./BackendClient";

export class ImagesServices extends BackendClient<IImagen> {
  async uploadImage(file: File): Promise<IImagen> {
    const formData = new FormData();
    formData.append("uploads", file);

    const response = await fetch(`${this.baseUrl}/uploads`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }

    const textData = await response.text();
    const data = textData.startsWith("{")
      ? JSON.parse(textData)
      : { url: textData, name: "generatedPublicId" };

    return { name: data.name, url: data.url };
  }
}
