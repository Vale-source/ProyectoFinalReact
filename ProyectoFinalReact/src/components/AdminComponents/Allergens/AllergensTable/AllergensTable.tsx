import { useState, useEffect } from "react";
import AllergensModal from "../AllergensModal/CreateAllergenModal";
import ViewAllergenModal from "../AllergensModal/ViewAllergenModal";
import UpdateAllergenModal from "../AllergensModal/UpdateAllergenModal";
import Swal from "sweetalert2";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { AllergensServices } from "../../../../services/allergensServices";
import { ImagesServices } from "../../../../services/imagesService";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../../../../types/dtos/alergenos/IUpdateAlergeno";
import React from "react";
import { ProductServices } from "../../../../services/productServices";
import { useAppSelector } from "../../../../hooks/hook";
import { RootState } from "../../../../store/store";

function Allergens() {
  const [allergens, setAllergens] = useState<IAlergenos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState<IAlergenos | null>(
    null
  );

  const allergensServices = new AllergensServices(
    "http://190.221.207.224:8090/alergenos"
  );

  const producsServices = new ProductServices(
    "http://190.221.207.224:8090/articulos"
  );

  async function createAllergenWithImage(file: File, name: string) {
    const imageService = new ImagesServices(
      "http://190.221.207.224:8090/images"
    );
    const allergenService = new AllergensServices(
      "http://190.221.207.224:8090/alergenos"
    );

    try {
      // Subir la imagen al servidor
      const imagen = await imageService.uploadImage(file);

      // Crear un objeto con los datos del alérgeno
      const allergenData: ICreateAlergeno = {
        denominacion: name,
        imagen: imagen,
      };

      // Crear el alérgeno
      await allergenService.createAllergen(allergenData);
    } catch (error) {
      console.error("Error en el proceso de creación de alérgeno:", error);
    }
  }

  async function updateAllergenWithImage(
    file: File | null,
    allergen: IAlergenos,
    name?: string
  ) {
    const imageService = new ImagesServices(
      "http://190.221.207.224:8090/images"
    );
    const allergenService = new AllergensServices(
      "http://190.221.207.224:8090/alergenos"
    );

    try {
      // Verifica si `file` es `null` antes de intentar subir una imagen
      const imagen = file
        ? await imageService.uploadImage(file)
        : allergen.imagen;

      const UpdateAllergenData: IUpdateAlergeno = {
        id: allergen.id,
        denominacion: name || allergen.denominacion, // Usa `name` si está definido, de lo contrario el valor actual
        imagen: imagen,
      };

      await allergenService.put(allergen.id, UpdateAllergenData);
    } catch (error) {
      console.error("Error en la actualización del alérgeno:", error);
    }
  }
  async function fetchAllergens() {
    try {
      const data = await allergensServices.getAllAllergens();
      setAllergens(data);
    } catch (error) {
      console.error("Error al cargar alérgenos:", error);
    }
  }
  useEffect(() => {
    fetchAllergens();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAllergen = async (file: File, name: string) => {
    try {
      await createAllergenWithImage(file, name);
      await fetchAllergens();
    } catch (error) {
      console.error("Error al crear alérgeno:", error);
    }
  };

  const handleUpdateAllergen = async (
    file: File | null,
    alergeno: IAlergenos,
    name?: string
  ) => {
    try {
      await updateAllergenWithImage(file, alergeno, name);
      await fetchAllergens();
    } catch (error) {
      console.error("Error al actualizar alérgeno:", error);
    }
  };

  const handleDeleteAllergen = async (allergen: IAlergenos) => {
    try {
      if (allergen) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
        });

        swalWithBootstrapButtons
          .fire({
            title: "¿Estás seguro?",
            text: `Eliminar alérgeno ${allergen.denominacion}`,
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
              await allergensServices.delete(allergen.id); // Espera a que se elimine el alérgeno
              await fetchAllergens(); // Llama a fetchAllergens después de eliminar
              swalWithBootstrapButtons.fire({
                title: "Eliminado!",
                text: "El alérgeno fue eliminado.",
                icon: "success",
                background: "#313131",
                color: "white",
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado!",
                text: "Tu alérgeno está a salvo :)",
                icon: "error",
                background: "#313131",
                color: "white",
              });
            }
          });
      }
    } catch (error) {
      console.error("Error al eliminar alérgeno:", error);
    }
  };

  // Función para manejar la edición, visualización y eliminación
  const handleView = (id: number) => {
    const allergen = allergens.find((a) => a.id === id);
    if (allergen) {
      setSelectedAllergen(allergen);
      setIsViewModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const allergen = allergens.find((a) => a.id === id);
    if (allergen) {
      setSelectedAllergen(allergen);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const allergen = allergens.find((a) => a.id === id);
    if (allergen) {
      setSelectedAllergen(allergen);
      handleDeleteAllergen(allergen);
    }
  };

  const buttonsOfAllergensTable = (id: number) => (
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
    <div className="activeScreenAdmin">
      <div
        style={{ display: "flex", justifyContent: "right", padding: "10px" }}>
        <button
          onClick={handleOpenModal}
          style={{
            backgroundColor: "transparent",
            color: "red",
            border: "solid 1px red",
            borderRadius: "12px",
            padding: "5px",
          }}>
          Agregar un Alergeno
        </button>

        {isModalOpen && (
          <AllergensModal
            onClose={handleCloseModal}
            createAllergenWithImage={handleCreateAllergen}
          />
        )}
        {isViewModalOpen && selectedAllergen && (
          <ViewAllergenModal
            allergen={selectedAllergen}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
        {isUpdateModalOpen && selectedAllergen && (
          <UpdateAllergenModal
            updateAllergenWithImage={handleUpdateAllergen}
            allergen={selectedAllergen}
            onClose={() => setIsUpdateModalOpen(false)}
          />
        )}
      </div>
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "100vh" }}>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {allergens.map((allergen) => (
              <tr key={allergen.denominacion}>
                <td>{allergen.denominacion}</td>
                <td>{buttonsOfAllergensTable(allergen.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Allergens;
