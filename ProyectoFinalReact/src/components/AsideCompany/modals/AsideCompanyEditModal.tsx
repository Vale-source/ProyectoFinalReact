import { FC, useState } from "react";
import Swal from "sweetalert2";
import { editCompany, IPropsEmpresas } from "../../../features/asideSlice/asideSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";

interface IPropsEditData {
	company: IPropsEmpresas | null;
	onClose: () => void;
}

export const AsideCompanyEditModal: FC<IPropsEditData> = ({
	company,
	onClose,
}) => {
	if (!company) return null;

	const dispatch = useAppDispatch();

	const companyState = useAppSelector((state) => state.asideSlice.value);

	const [newData, setNewData] = useState<IPropsEmpresas>({
		id: company.id,
		name: company.name,
		socialReason: company.socialReason,
		cuit: company.cuit,
		image: company.image,
		sucursales: company.sucursales
	});

	const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Verifico que en el input de CUIT solo se pueda ingresar numeros en caso contrario, remuevo cualquier caracter no numerico
		// En caso de ser numerico, actualizo los valores
		// Para los otros campos, actualizo los valores normalmente
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

	const handleSubmitNewData = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Verifico que todos los campos esten llenos
		const allFieldsFilled = () => {
			return (
				newData.name.trim() !== "" &&
				newData.socialReason.trim() !== "" &&
				newData.cuit !== 0 &&
				newData.image.trim() !== ""
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

		// Verificamos que el nombre solo contenga letras
		const nameVerify = () => {
			const nameRegex = /^[A-Za-z\s]+$/;
			return !nameRegex.test(newData.name);
		};

		// Verificamos que la razon social solo contenga letras
		const socialReasonVerify = () => {
			const socialReasonRegex = /^[A-Za-z\s]+$/;
			return !socialReasonRegex.test(newData.socialReason);
		};

		// Verificamos que el string ingresado sea una imagen, que comience con https
		const imageVerify = () => {
			const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
			return !urlRegex.test(newData.image);
		};

		// Verifico el CUIT
		const cuitVerify = () => {
			const cuitAsString = newData.cuit.toString();
			return (
				company.cuit === null ||
				company.cuit === undefined ||
				company.cuit <= 0 ||
				cuitAsString.length !== 11
			);
		};

		if (nameVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "El nombre no debe contener números ni caracteres especiales",
				background: "black",
				color: "white",
			});
			return;
		}

		if (socialReasonVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "La razón social no debe contener números ni caracteres especiales",
				background: "black",
				color: "white",
			});
			return;
		}

		if (cuitVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ingrese un CUIT válido (11 dígitos y mayor que 0)",
				background: "black",
				color: "white",
			});
			return;
		}

		if (imageVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ingrese una URL válida para la imagen",
				background: "black",
				color: "white",
			});
			return;
		}

		// Verifico que el CUIT no se repita
		const isDuplicate = companyState.some(
			(c) => c.cuit === newData.cuit && c.id !== newData.id
		);

		if (isDuplicate) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "No puedes repetir el mismo CUIT",
				background: "black",
				color: "white",
			});
			return;
		}

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
		})
		dispatch(editCompany(newData));
		onClose();
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
							<form onSubmit={handleSubmitNewData}>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="name"
										placeholder="Ingrese un nombre"
										aria-label="default input example"
										value={newData.name}
										onChange={handleEditData}
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="socialReason"
										placeholder="Ingrese una razon social"
										value={newData.socialReason}
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
										name="image"
										placeholder="Ingrese la URL de la imagen"
										value={newData.image}
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
