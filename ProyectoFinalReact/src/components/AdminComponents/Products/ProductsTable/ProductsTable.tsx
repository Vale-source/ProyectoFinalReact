import React, { useState, useEffect } from "react";

import ProductsModal from "../ProductsModal/ProductsModal";
import { ProductServices } from "../../../../services/productServices";
import { CategoriesServices } from "../../../../services/categoriesServices";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";

export const Products: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductos[]>([]); 
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const producsServices = new ProductServices(
    "http://190.221.207.224:8090/articulos"
  );
  const categoriesServices = new CategoriesServices(
    "http://190.221.207.224:8090/categorias"
  );

  const sucursalActiva = useAppSelector((state: RootState) => state.conectCompanyBranchSlice.activeBranch);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const data = await producsServices.getAllProductsForBranch(sucursalActiva? sucursalActiva.id : 0); 
      setProducts(data); 
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const fetchCategorias = async () => {
    const data = await categoriesServices.getAllCategoriesForBranch(sucursalActiva? sucursalActiva.id : 0); 
    setCategorias(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoria(event.target.value);
  };

  const filteredProductos = selectedCategoria
    ? products.filter(
        (producto) => producto.categoria.denominacion === selectedCategoria
      )
    : products;
  const handleView = (id: number) => {
    // Lógica para ver el producto
  };

  const handleEdit = (id: number) => {
    // Lógica para editar el producto
  };

  const handleDelete = (id: number) => {
    // Lógica para eliminar el producto
 
  };

  const buttonsOfProductsTable = (id: number) => (
    <div>
      <button
        onClick={() => handleView(id)}
        style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      </button>
      <button
        onClick={() => handleEdit(id)}
        style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
        </svg>
      </button>
      <button
        onClick={() => handleDelete(id)}
        style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
    </div>
  );

  const checkBoxProductsTable = () => {
    return (
      <svg
        style={{ width: "20px", height: "20px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
      </svg>
    );
  };

  const exBoxProductsTable = () => {
    return (
      <svg
        style={{ width: "20px", height: "20px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-x-circle"
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    );
  };

  return (
    <div className="activeScreenAdmin" style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          color: "white",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            gap: "5px",
          }}>
          <label htmlFor="categoria-filter">Filtrar por categoría:</label>
          <select
            style={{
              color: "white",
              backgroundColor: "rgb(49, 49, 49)",
              border: "solid 1px white",
              height: "50px",
              borderRadius: "12px",
            }}
            onChange={handleFilterChange}>
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.denominacion}>
                {categoria.denominacion}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
            gap: "5px",
          }}>
          <button
            onClick={handleOpenModal}
            style={{
              color: "white",
              backgroundColor: "rgb(49, 49, 49)",
              border: "solid 1px white",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
            id="addProduct">
            Agregar Producto{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </button>
          {isModalOpen && (
            <ProductsModal
              onClose={handleCloseModal}
              fetchProducts={fetchProducts}
            />
          )}
        </div>
      </div>

      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "100vh" }}>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">PRECIO</th>
              <th scope="col">DESCRIPCION</th>
              <th scope="col">CATEGORIA</th>
              <th scope="col">HABILITADO</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.denominacion}</th>
                <td>{product.precioVenta}</td>
                <td>{product.descripcion}</td>
                <td>{product.categoria.denominacion}</td>
                <td>
                  {product.habilitado
                    ? checkBoxProductsTable()
                    : exBoxProductsTable()}
                </td>
                <td>{buttonsOfProductsTable(product.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};
