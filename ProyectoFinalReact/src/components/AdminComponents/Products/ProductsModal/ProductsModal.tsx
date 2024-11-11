import React, { useEffect, useState } from "react";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import { IImagen } from "../../../../types/IImagen";
import { CategoriesServices } from "../../../../services/categoriesServices";
import { AllergensServices } from "../../../../services/allergensServices";
import { ProductServices } from "../../../../services/productServices";
import { ImagesServices } from "../../../../services/imagesService";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";
interface ProductsModalProps {
  onClose: () => void;
  fetchProducts: () => void;
}

const ProductsModal: React.FC<ProductsModalProps> = ({
  onClose,
  fetchProducts,
}) => {
  const [denominacion, setDenominacion] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenesToUpload, setImagenesToUpload] = useState<File[]>([]); // Cambiar a un array
  const [imagenes] = useState<IImagen[]>([]); // Cambiar a un array
  const [categoriaId, setCategoriaId] = useState<number | undefined>();
  const [alergenosIds, setAlergenosIds] = useState<number[]>([]);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [habilitado, setHabilitado] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const sucursalActiva = useAppSelector(
    (state: RootState) => state.conectCompanyBranchSlice.activeBranch
  );
  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriesServices = new CategoriesServices(
        "http://190.221.207.224:8090/categorias"
      );
      const data: ICategorias[] =
        await categoriesServices.getAllCategoriesForBranch(
          sucursalActiva ? sucursalActiva.id : 0
        ); //reemplazar con id de la sucursal seleccionada
      setCategorias(data);
    };

    const fetchAlergenos = async () => {
      const allergensServices = new AllergensServices(
        "http://190.221.207.224:8090/alergenos"
      );
      const data: IAlergenos[] = await allergensServices.getAllAllergens();
      setAlergenos(data);
    };

    fetchCategorias();
    fetchAlergenos();
  }, []);

  const handleConfirm = async () => {
    if (
      !denominacion ||
      !precioVenta ||
      !codigo ||
      !descripcion ||
      !categoriaId ||
      alergenosIds.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos!",
        background: "#313131",
        color: "white",
      });
      return;
    }

    const createProducto: ICreateProducto = {
      denominacion,
      precioVenta: parseFloat(precioVenta),
      descripcion,
      habilitado,
      codigo,
      idCategoria: categoriaId as number,
      idAlergenos: alergenosIds,
      imagenes: imagenes.map((img) => ({ name: img.name, url: img.url })), // Usar el array de imágenes
    };

    const imageService = new ImagesServices(
      "http://190.221.207.224:8090/images"
    );

    try {
      setIsLoading(true); // Activar el estado de carga
      const uploadedImages = await Promise.all(
        imagenesToUpload.map(async (img) => {
          const uploadedImage = await imageService.uploadImage(img);
          return { name: uploadedImage.name, url: uploadedImage.url };
        })
      );

      createProducto.imagenes.push(...uploadedImages);

      const productsServices = new ProductServices(
        "http://190.221.207.224:8090/articulos"
      );

      await productsServices.createProduct(createProducto);
      Swal.fire({
        icon: "success",
        title: "Confirmado!",
        text: `El producto ${createProducto.denominacion} ha sido creado con exito!`,
        background: "#313131",
        color: "white",
      });
      onClose(); // Cerrar el modal solo si la creación fue exitosa
      fetchProducts();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al crear el producto.",
        background: "#313131",
        color: "white",
      });
    }finally{
      setIsLoading(false); 
    }
  };

  return (
    <div
      className="ProductsModalDiv"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(1px)",
      }}>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          width: "850px",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          border: "1px solid white",
        }}>
        <h2>Crear un articulo</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            width: "100%",
          }}>
          <div
            className="inputsDivProductsModal"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresar una denominación"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
            />
            <select
            style={{ backgroundColor: "black", color: "white" }}
              name="categoria"
              onChange={(e) => setCategoriaId(Number(e.target.value))}
              value={categoriaId}>
              <option value="">Seleccionar categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
            <div
              style={{
                display: "grid",
                gap: "5px",
                backgroundColor: "black",
                padding: "10px",
                border: "1px solid white",
                borderRadius: "5px",
                color: "white",
                maxHeight: "150px",
                overflowY: "auto",
              }}>
              <label style={{ marginBottom: "5px" }}>
                Selecciona alérgenos:
              </label>
              {alergenos.map((alergeno) => (
                <div
                  key={alergeno.id}
                  onClick={() => {
                    setAlergenosIds(
                      (prevIds) =>
                        prevIds.includes(alergeno.id)
                          ? prevIds.filter((id) => id !== alergeno.id) // Deseleccionar si ya está seleccionado
                          : [...prevIds, alergeno.id] // Seleccionar si no está en la lista
                    );
                  }}
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: alergenosIds.includes(alergeno.id)
                      ? "gray"
                      : "black",
                    border: "1px solid white",
                    textAlign: "center",
                  }}>
                  {alergeno.denominacion}
                </div>
              ))}
            </div>
            <input
              type="text"
              name="precioVenta"
              placeholder="Ingresa un precio de venta"
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
            />
            <input
              type="text"
              name="codigo"
              placeholder="Ingresa un codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid white",
                padding: "10px",
                height: "40px",
              }}>
              <label style={{ display: "flex", alignItems: "center", gap: "250px" }}>
                Habilitado
                <input
                  type="checkbox"
                  checked={habilitado}
                  onChange={() => setHabilitado((prev) => !prev)}
                  style={{ marginRight: "10px" }}
                />
              </label>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <textarea
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
                height: "200px",
              }}
              placeholder="Ingrese una descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}></textarea>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid white",
                padding: "10px",
                gap: "10px",
              }}>
              <div className="custom-file-upload">
                <label htmlFor="file-upload" className="file-upload-label">
                  Seleccionar archivo
                </label>
                <input
                  accept="image/*"
                  name="imagen"
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setImagenesToUpload(Array.from(e.target.files)); // Almacenar múltiples imágenes
                    }
                  }}
                />
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                className="bi bi-camera"
                viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",  // Rojo
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}  // Deshabilitar el botón mientras carga
          >
            {loading ? "Cargando..." : "Cancelar"}
          </button>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: "#4CAF50",  // Verde
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}  // Deshabilitar el botón mientras carga
          >
            {loading ? "Cargando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;
