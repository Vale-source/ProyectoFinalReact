import React, { FC, useState } from "react";
import { IProductos } from "../../../../types/dtos/productos/IProductos";

interface ViewProductModalProps {
  product: IProductos;
  onClose: () => void;
}
export const viewProductModal: FC<ViewProductModalProps> = ({
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
        <div>
        <h2>Detalles de Producto</h2>
        <h3>{product.denominacion}</h3>
        {product.imagenes.length > 0 ? (
          <>
            <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
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
              <button onClick={handlePreviousImage} style={{ position: "absolute", top: "50%", left: "0" }}>
                ◀
              </button>
              <button onClick={handleNextImage} style={{ position: "absolute", top: "50%", right: "0" }}>
                ▶
              </button>
            </div>
            <p>{product.imagenes[currentImageIndex].name}</p>
          </>
        ) : (
          <p>Imagen no disponible</p>
        )}
      </div>
    );
  }
};
