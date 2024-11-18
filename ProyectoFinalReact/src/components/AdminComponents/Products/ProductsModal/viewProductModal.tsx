import  { FC, useState } from "react";
import { IProductos } from "../../../../types/dtos/productos/IProductos";

interface ViewProductModalProps {
  product: IProductos;
  onClose: () => void;
  
}
export const ViewProductModal: FC<ViewProductModalProps> = ({
  product,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para ir a la siguiente imagen
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir a la imagen anterior
  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imagenes.length - 1 : prevIndex - 1
    );
  };

  if (product) {
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
            width: "800px",
            height: "600px",
            padding: "10px",
            borderRadius: "5px",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            border: "1px solid white",
            textAlign: "center",
          }}>
          <h2>Detalles de Producto</h2>
          <h3>{product.denominacion}</h3>
          {product.imagenes.length > 0 ? (
            <>
              <div
                style={{
                  position: "relative",
                  width: "300px",
                  margin: "0 auto",
                }}>
                <img
                  src={product.imagenes[currentImageIndex].url}
                  alt={product.denominacion}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                    borderRadius: "8px",
                  }}
                />
                <button
                  onClick={handlePreviousImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "50%",
                  }}>
                  ◀
                </button>
                <button
                  onClick={handleNextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "50%",
                  }}>
                  ▶
                </button>
              </div>
            </>
          ) : (
            <p>Imagen no disponible</p>
          )}

          {/* Sección de Alérgenos */}
          <div style={{ marginTop: "10px", color: "white" }}>
            <h4>Alérgenos:</h4>
            {product.alergenos && product.alergenos.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {product.alergenos.map((alergeno) => (
                  <li key={alergeno.id}>{alergeno.denominacion}</li>
                ))}
              </ul>
            ) : (
              <p>No contiene alérgenos</p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
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
              }}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export default ViewProductModal;
