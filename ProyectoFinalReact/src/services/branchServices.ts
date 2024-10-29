import axios from "axios";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";

const baseURL = "http://190.221.207.224:8090/sucursales";

// Servicio para obtener todas las sucursales
export const getAllBranchsByCompany = async (
  id: number
): Promise<ISucursal[]> => {
  const response = await axios.get<ISucursal[]>(baseURL + `/porEmpresa/${id}`);
  return response.data;
};

// Servicio para crear una sucursal segun empresa
export const createBranch = async (
  data: ICreateSucursal
): Promise<ICreateSucursal> => {
  const response = await axios.post<ICreateSucursal>(baseURL + "/create", data);
  return response.data;
};

// Servicio para editar una sucursal
export const editBranch = async (
  id: number,
  data: Partial<IUpdateSucursal>
): Promise<IUpdateSucursal> => {
  const response = await axios.put<IUpdateSucursal>(baseURL + `/update/${id}`, data);
  return response.data;
};

// Servicio para saber si la sucursal es casa matriz
export const getItsCasaMatriz = async (
    id: number
  ): Promise<Boolean> => {
    const response = await axios.get<Boolean>(baseURL + `/existCasaMatriz/${id}`);
    return response.data;
  };