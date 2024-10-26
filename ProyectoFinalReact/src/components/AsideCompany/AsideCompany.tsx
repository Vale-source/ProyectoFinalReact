import Swal from "sweetalert2";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { addCompany } from "../../features/asideSlice/asideSlice";
import { ListCompany } from "./ListCompany";
import { AsideCompanyModal } from "../modals/AsideCompanyModal";
import { RootState } from "../../store/store";
import { v4 as uuidv4 } from "uuid";

export interface IPropsEmpresas {
	id: string;
	name: string;
	socialReason: string;
	cuit: number;
	image: string;
}

const AsideCompany = () => {
	const [showModal, setShowModal] = useState(false);

	const dispatch = useAppDispatch();

	const companyState = useAppSelector(
		(state: RootState) => state.asideSlice.value
	);

	let intialState = {
		id: "",
		name: "",
		socialReason: "",
		cuit: 0,
		image: "",
	};

	const [activeCompany, setActiveCompany] =
		useState<IPropsEmpresas>(intialState);

	const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setActiveCompany((prevState) => ({
			...prevState,
			[name]: name === "cuit" ? Number(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		activeCompany.id = uuidv4();

		// Verifico que todos los campos esten llenos
		const allFieldsFilled = () => {
			return (
				activeCompany.name.trim() !== "" &&
				activeCompany.socialReason.trim() !== "" &&
				activeCompany.cuit !== 0 &&
				activeCompany.image.trim() !== ""
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
			return !nameRegex.test(activeCompany.name);
		};

		// Verificamos que la razon social solo contenga letras
		const socialReasonVerify = () => {
			const socialReasonRegex = /^[A-Za-z\s]+$/;
			return !socialReasonRegex.test(activeCompany.socialReason);
		};

		// Verificamos que el string ingresado sea una imagen, que comience con https
		const imageVerify = () => {
			const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
			return !urlRegex.test(activeCompany.image);
		};

		// Verifico el CUIT
		const cuitVerify = () => {
			const cuitAsString = activeCompany.cuit.toString();
			return (
				activeCompany.cuit === null ||
				activeCompany.cuit === undefined ||
				activeCompany.cuit <= 0 ||
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
			(c) => c.cuit === activeCompany.cuit
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
			title: "Empresa guardada",
			showConfirmButton: true,
			confirmButtonText: "Aceptar",
			customClass: {
				confirmButton: "btn btn-success"
			},
			background: "black",
			color: "white",
		})
		dispatch(addCompany(activeCompany));
		setShowModal(false);

		const initialState = {
			id: "",
			name: "",
			socialReason: "",
			cuit: 0,
			image: "",
		};
		setActiveCompany(initialState);
	};

	return (
		<div
			className="asideGeneral"
			style={{
				alignItems: "center",
			}}>
			<h1 className="">Empresas</h1>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => setShowModal(true)}
				style={{
					borderRadius: "30px",
					border: "2px solid black",
					transition: "all 0.3s ease"	
				}}>
				Agregar empresa
			</button>
			{showModal && (
				<AsideCompanyModal
					inicialState={intialState}
					closeModal={setShowModal}
					handleChanges={handleChanges}
					handleAddCompany={handleSubmit}
				/>
			)}
			<ListCompany />
		</div>
	);
};

export default AsideCompany;
