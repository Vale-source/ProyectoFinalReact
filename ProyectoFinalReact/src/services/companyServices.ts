import axios from "axios";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";

const baseURL = "http://190.221.207.224:8090/empresas";

// Servicio para obtener todas las empresas
export const getAllCompanies = async (): Promise<IEmpresa[]> => {
  const response = await axios.get<IEmpresa[]>(baseURL);
  return response.data;
};

// Servicio para obtener empresa por id
export const getCompanyById = async (id: number): Promise<IEmpresa> => {
    const response = await axios.get<IEmpresa>(baseURL + `/${id}`);
    return response.data;
  };

// Servicio para crear una empresa
export const createCompany = async (
  data: ICreateEmpresaDto
): Promise<ICreateEmpresaDto> => {
  const response = await axios.post<ICreateEmpresaDto>(baseURL, data);
  return response.data;
};

// Servicio para editar una empresa
export const updateCompany = async (
  id: number,
  data: Partial<IUpdateEmpresaDto>
): Promise<IUpdateEmpresaDto> => {
  const response = await axios.put<IUpdateEmpresaDto>(baseURL + `/${id}`, data);
  return response.data;
};

// Servicio para eliminar una empresa
export const deleteEmpresa = async (id: number): Promise<void> => {
  await axios.delete(baseURL + `/${id}`);
};
