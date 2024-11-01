import { FC, useState } from "react";
import Swal from "sweetalert2";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";
import { CompanyServices } from "../../../services/companyServices";

interface IPropsEditData {
    company: IUpdateEmpresaDto | null;
    onClose: () => void;
}

export const AsideCompanyEditModal: FC<IPropsEditData> = ({
    company,
    onClose
}) => {
    if (!company) return null;

    const [newData, setNewData] = useState<IUpdateEmpresaDto>({
        id: company.id,
        nombre: company.nombre,
        razonSocial: company.razonSocial,
        cuit: company.cuit,
        logo: company.logo,
        eliminado: false
    });

    const URL = "http://190.221.207.224:8090"; // Ensure this is correctly set in your environment variables
    const companyServices = new CompanyServices(URL + "/empresas");

    const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "cuit") {
            const numericValue = value.replace(/\D/g, ""); // Remueve caracteres no numéricos

            setNewData({
                ...newData,
                cuit: Number(numericValue),
            });
        } else {
            setNewData({
                ...newData,
                [name]: value,
            });
        }
    };


    const handleSubmitNewData = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();

        const allFieldsFilled = () => {
            return (
                newData.nombre.trim() !== "" &&
                newData.razonSocial.trim() !== "" &&
                newData.cuit !== 0 &&
                newData.logo?.trim() !== ""
            );
        };

        if (!allFieldsFilled()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Completa todos los datos antes de guardar",
                background: "black",
                color: "white",
            });
            return;
        }

        try {
            await companyServices.put(id, newData);
            Swal.fire({
                icon: "success",
                title: "Datos actualizados",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-success"
                },
                background: "black",
                color: "white",
            });

            companyServices.getAllCompany()
            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar la empresa",
                background: "black",
                color: "white",
            });
        }
    };


    return (
        <div>
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    backdropFilter: "blur(10px)",
                }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div
                        className="modal-content"
                        style={{
                            background: "black",
                            border: "1px solid white",
                        }}>
                        <div className="modal-header" style={{ justifyContent: "center" }}>
                            <h2
                                className="modal-title fs-5"
                                id="staticBackdropLabel"
                                style={{ color: "white" }}>
                                Editar Empresa
                            </h2>
                        </div>
                        <div
                            className="modal-body"
                            style={{
                                margin: "0.4rem",
                                padding: "0.4rem",
                                justifyContent: "space-between",
                            }}>
                            <form onSubmit={(e) => handleSubmitNewData(e, newData.id)}>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="nombre"
                                        placeholder="Ingrese un nombre"
                                        aria-label="default input example"
                                        value={newData.nombre}
                                        onChange={handleEditData}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="razonSocial"
                                        placeholder="Ingrese una razon social"
                                        value={newData.razonSocial}
                                        onChange={handleEditData}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="cuit"
                                        placeholder="Ingrese un CUIT"
                                        value={newData.cuit.toString()}
                                        onChange={handleEditData}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="url"
                                        name="logo"
                                        placeholder="Ingrese la URL de la imagen"
                                        value={newData.logo || ""}
                                        onChange={handleEditData}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{
                                            transition: "all 0.3s ease",
                                        }}>
                                        Confirmar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        style={{
                                            transition: "all 0.3s ease",
                                        }}
                                        onClick={() => onClose()}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
