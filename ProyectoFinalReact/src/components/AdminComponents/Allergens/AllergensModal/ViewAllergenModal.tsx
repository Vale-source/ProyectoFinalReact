import { FC } from "react";

import React from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";

interface ViewAllergenModalProps {
  allergen: IAlergenos | null;
  onClose: () => void;
}

const ViewAllergenModal: FC<ViewAllergenModalProps> = ({
  allergen,
  onClose,
}) => {
  if (allergen) {
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
            height: "500px",
            padding: "10px",
            borderRadius: "5px",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px",
            border: "1px solid white",
            textAlign: "center",
          }}>
          <h2>Detalles del Alergeno</h2>
          <h3>{allergen.denominacion}</h3>
          {allergen.imagen ? (
            <>
              <img
                src={allergen.imagen.url}
                alt={allergen.denominacion}
                style={{
                  width: "300px", // Ancho fijo para la imagen
                  height: "300px", // Alto fijo para la imagen
                  objectFit: "cover", // Recorta la imagen manteniendo la proporción
                  display: "block", // Quita el espacio extra que pueden tener los elementos inline
                  margin: "0 auto", // Centra la imagen horizontalmente
                  borderRadius: "8px",
                }}
              />
            </>
          ) : (
            <p>Imagen no disponible</p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                width: "150px",
                border: "1px solid white",
              }}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default ViewAllergenModal;
