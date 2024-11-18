import { FC, useState } from "react";
import Swal from "sweetalert2";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";
import { CompanyServices } from "../../../services/companyServices";
import { ImagesServices } from "../../../services/imagesService"; 

interface IPropsEditData {
	company: IUpdateEmpresaDto | null;
	onClose: () => void;
}

export const AsideCompanyEditModal: FC<IPropsEditData> = ({
	company,
	onClose,
}) => {
	if (!company) return null;

	const [newData, setNewData] = useState<IUpdateEmpresaDto>({
		id: company.id,
		nombre: company.nombre,
		razonSocial: company.razonSocial,
		cuit: company.cuit,
		logo: company.logo,
		eliminado: false,
	});

	const [file, setFile] = useState<File | null>(null); 

	const URL = "http://190.221.207.224:8090";
	const companyServices = new CompanyServices(URL + "/empresas");
	const imageService = new ImagesServices(URL + "/images");

	const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "cuit") {
			const numericValue = value.replace(/\D/g, "");

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]); 
		}
	};

	
	const updateCompanyWithImage = async (file: File | null, company: IUpdateEmpresaDto) => {
		try {
			
			const imageUrl = file ? (await imageService.uploadImage(file)).url : company.logo;

			
			const updatedCompanyData: IUpdateEmpresaDto = {
				...company,
				logo: imageUrl, 
			};

			await companyServices.put(company.id, updatedCompanyData);
		} catch (error) {
			console.error("Error al actualizar la empresa:", error);
		}
	};

	const handleSubmitNewData = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const allFieldsFilled = () => {
			return (
				newData.nombre.trim() !== "" &&
				newData.razonSocial.trim() !== "" &&
				newData.cuit !== 0 &&
				(file !== null || newData.logo?.trim() !== "")
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
			await updateCompanyWithImage(file, newData);
			Swal.fire({
				icon: "success",
				title: "Datos actualizados",
				showConfirmButton: true,
				confirmButtonText: "Aceptar",
				customClass: {
					confirmButton: "btn btn-success",
				},
				background: "black",
				color: "white",
			});

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
			<div className="modal fade show" style={{ display: "block", backdropFilter: "blur(10px)" }}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content" style={{ background: "black", border: "1px solid white" }}>
						<div className="modal-header" style={{ justifyContent: "center" }}>
							<h2 className="modal-title fs-5" style={{ color: "white" }}>
								Editar Empresa
							</h2>
						</div>
						<div className="modal-body" style={{ margin: "0.4rem", padding: "0.4rem" }}>
							<form onSubmit={handleSubmitNewData}> 
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="nombre"
										placeholder="Ingrese un nombre"
										value={newData.nombre}
										onChange={handleEditData}
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="razonSocial"
										placeholder="Ingrese una razón social"
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
										type="file"
										accept="image/*"
										onChange={handleFileChange}
									/>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn btn-success">
										Confirmar
									</button>
									<button type="button" className="btn btn-danger" onClick={() => onClose()}>
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
