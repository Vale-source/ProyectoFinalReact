import { useEffect, useState } from "react";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../../types/dtos/productos/IUpdateProducto";
import { ProductServices } from "../../../../services/productServices";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { AllergensServices } from "../../../../services/allergensServices";
import { ImagesServices } from "../../../../services/imagesService";
import Swal from "sweetalert2";

interface EditProductModalProps {
  product: IProductos;
  categorias: ICategorias[]; // Lista de categorías, asegúrate de definir su tipo correctamente
  onClose: () => void;
  fetchProducts: () => void;
}

const UpdateProductModal: React.FC<EditProductModalProps> = ({
  product,
  categorias,
  onClose,
  fetchProducts,
}) => {
  const [values, setValues] = useState<IUpdateProducto>({
    id: product.id,
    denominacion: product.denominacion,
    precioVenta: product.precioVenta,
    descripcion: product.descripcion,
    codigo: product.codigo,
    habilitado: product.habilitado,
    eliminado: product.eliminado,
    imagenes: product.imagenes || [],
    idCategoria: product.categoria.id,
    idAlergenos: product.alergenos.map((alergeno) => alergeno.id),
  });

  const [imagenesToUpload, setImagenesToUpload] = useState<File[]>([]); // Para múltiples imágenes
  const [alergeno, setAlergeno] = useState<IAlergenos[] | null>(null);
  const [habilitado, setHabilitado] = useState<boolean>(product.habilitado);
  const [categoriaSelected, setCategoriaSelected] = useState<number>(
    product.categoria.id
  );
  const [parseAlergenos, setParseAlergenos] = useState<number[]>(
    product.alergenos.map((alergeno) => alergeno.id)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productService = new ProductServices(
    "http://190.221.207.224:8090/articulos"
  );
  const allergensServices = new AllergensServices(
    "http://190.221.207.224:8090/alergenos"
  );
  const imageService = new ImagesServices("http://190.221.207.224:8090/images");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setValues({
      ...values,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precioVenta"
          ? parseFloat(value)
          : value,
    });
  };

  // Para manejar los cambios de los alérgenos seleccionados
  const handleAlergenosChange = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    setParseAlergenos(
      (prevIds) =>
        prevIds.includes(id)
          ? prevIds.filter((prevId) => prevId !== id) // Deseleccionar
          : [...prevIds, id] // Seleccionar
    );
  };

  async function fetchAllergens() {
    try {
      const data = await allergensServices.getAllAllergens();
      setAlergeno(data);
    } catch (error) {
      console.error("Error al cargar alérgenos:", error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagenesToUpload((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoriaSelected(parseInt(e.target.value));
  };


  const handleSave = async () => {
    setLoading(true);
    setError(null);
    if (
      !values.denominacion ||
      !values.precioVenta ||
      !values.descripcion ||
      !values.codigo ||
      !categoriaSelected ||
      !parseAlergenos.length
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ningun campo puede quedar vacio!.",
        background: "#313131",
        color: "white",
      });
      setLoading(false);
      return;
    }
    try {
      // Subir todas las imágenes seleccionadas
      const uploadedImages = await Promise.all(
        imagenesToUpload.map(async (img) => {
          const uploadedImage = await imageService.uploadImage(img);
          return { name: uploadedImage.name, url: uploadedImage.url };
        })
      );

      const updatedProduct = {
        id: values.id,
        denominacion: values.denominacion,
        precioVenta: values.precioVenta,
        descripcion: values.descripcion,
        codigo: values.codigo,
        habilitado: values.habilitado,
        eliminado: values.eliminado,
        imagenes: uploadedImages.length > 0 ? uploadedImages : values.imagenes,
        idCategoria: categoriaSelected,
        idAlergenos: parseAlergenos,
      };

      await productService.updateProduct(values.id, updatedProduct);
      onClose();
      fetchProducts();
    } catch (err) {
      setError("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValues({
      id: product.id,
      denominacion: product.denominacion,
      precioVenta: product.precioVenta,
      descripcion: product.descripcion,
      codigo: product.codigo,
      habilitado: product.habilitado,
      eliminado: product.eliminado,
      imagenes: product.imagenes || [],
      idCategoria: product.categoria.id,
      idAlergenos: product.alergenos.map((alergeno) => alergeno.id),
    });
    setCategoriaSelected(product.categoria.id);
    fetchAllergens();
    setParseAlergenos(product.alergenos.map((alergeno) => alergeno.id));
  }, [product]);

  return (
    <div
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
        <h2>Editar Producto</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            width: "100%",
          }}>
          {/* Primera columna de inputs */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor="denominacion">Denominacion</label>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresar nombre del producto"
              value={values.denominacion}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
              }}
            />
            <label htmlFor="categoria">Categoria</label>
            <select
              name="categoria"
              onChange={handleCategoriaChange}
              value={categoriaSelected}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
              }}>
              <option value="">Seleccionar categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
            <label style={{ marginBottom: "5px" }}>Selecciona alérgenos:</label>
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
              {alergeno && alergeno.length > 0 ? (
                alergeno.map((alergeno) => (
                  <div
                    key={alergeno.id}
                    onClick={(e) => handleAlergenosChange(e, alergeno.id)}
                    style={{
                      padding: "8px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: parseAlergenos.includes(alergeno.id)
                        ? "gray"
                        : "black",
                      border: "1px solid white",
                      textAlign: "center",
                    }}>
                    {alergeno.denominacion}
                  </div>
                ))
              ) : (
                <p>No hay alérgenos disponibles</p>
              )}
            </div>
            {/* Imagenes */}

            <input
              type="file"
              onChange={handleImageChange}
              multiple
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
              }}
            />
          </div>

          {/* Segunda columna de inputs */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor="descripcion">Descripción</label>
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
              value={values.descripcion} // Asegúrate de usar el estado correcto aquí
              onChange={(e) =>
                setValues({ ...values, descripcion: e.target.value })
              } // Actualiza el estado al cambiar el texto
            />
            <label htmlFor="precioVenta">Precio</label>
            <input
              type="number"
              name="precioVenta"
              placeholder="Ingresar precio de venta"
              value={values.precioVenta}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
              }}
            />
            <label htmlFor="codigo">Codigo</label>
            <input
              type="text"
              name="codigo"
              placeholder="Código del producto"
              value={values.codigo}
              onChange={handleInputChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
              }}
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
              <label style={{ display: "flex", alignItems: "center", gap: "290px" }}>
                Habilitado
                <input
                  type="checkbox"
                  checked={habilitado}
                  
                  onChange={(e) => {
                    setHabilitado((prev) => !prev);
                    handleInputChange(e);
                  }}
                  style={{ marginRight: "10px" }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Mensajes de error */}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Cerrar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
