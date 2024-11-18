import { useState } from "react";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";
import Swal from "sweetalert2";
import { CategoriesServices } from "../../../../services/categoriesServices";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";

interface EditCategoryModal {
  onClose: () => void;
  fetchCategories: () => void;
  category: ICategorias;
}

const EditCategoryModal: React.FC<EditCategoryModal> = ({
  onClose,
  fetchCategories,
  category,
}) => {
  const sucursalActiva = useAppSelector(
    (state: RootState) => state.conectCompanyBranchSlice.activeBranch
  );
  const [denominacion, setDenominacion] = useState<string>(category.denominacion);
  const idEmpresa = sucursalActiva?.empresa?.id || 0;
  const idCategory = category.id;
  const [loading, setLoading] = useState(false); 
  const categoriesServices = new CategoriesServices(
    "http://190.221.207.224:8090/categorias"
  );

  const updateCategory = async () => {
    const data: IUpdateCategoria = {
        id: idCategory,
        eliminado: false,
        denominacion: denominacion,
        idEmpresa: idEmpresa,
        idCategoriaPadre: null
    }
    await categoriesServices.updateCategory(category.id,data)
  };

  const handleConfirm = async () => {
    if (!denominacion) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa la denominacion de la categoria!",
        background: "#313131",
        color: "white",
      });
      return;
    }
    setLoading(true);

    try {
      await updateCategory();
      Swal.fire({
        icon: "success",
        title: "Confirmado!",
        text: `La categoria ${denominacion} ha sido editada con exito!`,
        background: "#313131",
        color: "white",
      });
      fetchCategories();
      onClose();
    } catch (error) {
      console.error("Error al editar la categoria:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al editar la categoria.",
        background: "#313131",
        color: "white",
      });
    } finally {
      setLoading(false); 
    }
  };

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
          width: "650px",
          height: "250px",
          padding: "10px",
          borderRadius: "5px",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          gap: "0px",
          border: "1px solid white",
          textAlign: "center",
        }}>
        <h2>Editar la categoria {category.denominacion}</h2>
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "500px",
            backgroundColor: "black",
            border: "1px solid white",
            color: "white",
          }}
          type="text"
          placeholder="Ingresa una denominación"
          value={denominacion}
          onChange={(e) => setDenominacion(e.target.value)}
        />

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading} 
          >
            {loading ? "Cargando..." : "Cancelar"}
          </button>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: "#4CAF50", 
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
