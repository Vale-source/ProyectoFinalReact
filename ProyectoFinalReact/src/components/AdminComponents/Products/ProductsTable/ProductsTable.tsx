import React, { useState, useEffect } from "react";

import ProductsModal from "../ProductsModal/ProductsModal";
import { ProductServices } from "../../../../services/productServices";
import { CategoriesServices } from "../../../../services/categoriesServices";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";

import UpdateProductModal from "../ProductsModal/UpdateProductModal";
import Swal from "sweetalert2";
import ViewProductModal from "../ProductsModal/viewProductModal";

export const Products: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductos[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProductos[]>([]);
  const [subCategorias, setSubCategorias] = useState<ICategorias[]>([]);
  const [selectedSubCategoria, setSelectedSubCategoria] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<IProductos | null>(
    null
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const productServices = new ProductServices(
    "http://190.221.207.224:8090/articulos"
  );
  const categoriesServices = new CategoriesServices(
    "http://190.221.207.224:8090/categorias"
  );
  const sucursalActiva = useAppSelector(
    (state: RootState) => state.conectCompanyBranchSlice.activeBranch
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchProducts = async (page: number) => {
    try {
      const data = await productServices.getPagedProductsForBranch(
        sucursalActiva ? sucursalActiva.id : 0,
        page,
        pageSize
      );
      setProducts(data.content);
      setFilteredProducts(data.content);
      setTotalPages(data.totalPages); 
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data: ICategorias[] =
        await categoriesServices.getAllCategoriesPadreForBranch(
          sucursalActiva ? sucursalActiva.id : 0
        );
      const allSubCategorias = data.flatMap(
        (categoria) => categoria.subCategorias
      );
      setSubCategorias(allSubCategorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategorias();
  }, [currentPage, sucursalActiva]);

  useEffect(() => {
    if (selectedSubCategoria) {
      const filtered = products.filter(
        (product) => product.categoria.denominacion === selectedSubCategoria
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedSubCategoria, products]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategoria(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteProduct = async (product : IProductos) => {
    try {
      if (product) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
        });

        swalWithBootstrapButtons
          .fire({
            title: "¿Estás seguro?",
            text: `Eliminar producto ${product.denominacion}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            background: "#313131",
            color: "white",
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await productServices.delete(product.id); 
              await fetchProducts(currentPage); 
              swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: "El producto fue eliminado.",
                icon: "success",
                background: "#313131",
                color: "white",
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado!",
                text: "Tu producto está a salvo :)",
                icon: "error",
                background: "#313131",
                color: "white",
              });
            }
          });
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };
  const handleView = (id: number) => {
    const product = products.find((a) => a.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsViewModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const product = products.find((a) => a.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const product = products.find((a) => a.id === id);
    if (product) {
      handleDeleteProduct(product)
    }
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

  return (
    <div className="activeScreenAdmin" style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          color: "white",
        }}>
        <div>
          <label htmlFor="categoria-filter">Filtrar por subcategoría:</label>
          <select
            onChange={handleFilterChange}
            style={{ color: "white", backgroundColor: "rgb(49, 49, 49)" }}>
            <option value="">Todas</option>
            {subCategorias.map((subCategoria) => (
              <option key={subCategoria.id} value={subCategoria.denominacion}>
                {subCategoria.denominacion}
              </option>
            ))}
          </select>
        </div>
        <button
          style={{
            backgroundColor: "transparent",
            color: "red",
            border: "solid 1px red",
            borderRadius: "12px",
            padding: "5px",
          }}
          onClick={handleOpenModal}>
          Agregar Producto
        </button>
        {isModalOpen && (
          <ProductsModal
            onClose={handleCloseModal}
            fetchProducts={() => fetchProducts(currentPage)}
          />
        )}
        {isViewModalOpen && selectedProduct && (
          <ViewProductModal
            product={selectedProduct}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
        {isUpdateModalOpen && selectedProduct && (
          <UpdateProductModal
            product={selectedProduct}
            categorias={subCategorias}
            onClose={() => setIsUpdateModalOpen(false)}
            fetchProducts={() => fetchProducts(currentPage)}
          />
        )}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>DESCRIPCION</th>
              <th>CATEGORIA</th>
              <th>HABILITADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.denominacion}</td>
                <td>{product.precioVenta}</td>
                <td>{product.descripcion}</td>
                <td>{product.categoria.denominacion}</td>
                <td>{product.habilitado ? "✔️" : "❌"}</td>
                <td>{buttonsOfProductsTable(product.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index ? "gray" : "white",
              color: currentPage === index ? "white" : "black",
            }}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
