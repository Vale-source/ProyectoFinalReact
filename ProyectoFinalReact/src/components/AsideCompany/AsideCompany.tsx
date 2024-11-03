import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { AsideCompanyModal } from "./modals/AsideCompanyModal";
import { ListCompany } from "./ListCompany";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { CompanyServices } from "../../services/companyServices";

const AsideCompany = () => {
	const [showModal, setShowModal] = useState(false);
	const [activeCompany, setActiveCompany] = useState<ICreateEmpresaDto>({
		nombre: "",
		razonSocial: "",
		cuit: 0,
		logo: "",
	});

	const [company, setCompany] = useState<IEmpresa[]>([])

	const URL = "http://190.221.207.224:8090"

	const companyServices = new CompanyServices(URL + "/empresas");

	const handleChanges = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const newValue = name === "cuit" && value !== "" ? Number(value) : value;

		setActiveCompany((prevState) => ({
			...prevState,
			[name]: newValue,
		}));

	};

	const refreshCompanyList = async () => {
		const company: IEmpresa[] = await companyServices.getAllCompany();
		setCompany(company);
	};

	useEffect(() => {
		refreshCompanyList();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Verifico que todos los campos esten llenos
		const allFieldsFilled = () => {
			return (
				activeCompany.nombre.trim() !== "" &&
				activeCompany.razonSocial.trim() !== "" &&
				activeCompany.cuit !== 0 &&
				activeCompany.logo?.trim() !== ""
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
			const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
			return nameRegex.test(activeCompany.nombre);
		};

		// Verificamos que la razon social solo contenga letras
		const socialReasonVerify = () => {
			const socialReasonRegex = /^[A-Za-z\s]+$/;
			return socialReasonRegex.test(activeCompany.razonSocial);
		};

		// Verificamos que el string ingresado sea una imagen, que comience con https
		const imageVerify = () => {
			const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
			return activeCompany.logo !== null && urlRegex.test(activeCompany.logo);
		};

		// Verifico el CUIT
		const cuitVerify = () => {
			const cuitAsString = activeCompany.cuit.toString();
			return cuitAsString.length === 11 && activeCompany.cuit > 0;
		};

		if (!nameVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "El nombre no debe contener números ni caracteres especiales",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!socialReasonVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "La razón social no debe contener números ni caracteres especiales",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!cuitVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ingrese un CUIT válido (11 dígitos y mayor que 0)",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!imageVerify()) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ingrese una URL válida para la imagen",
				background: "black",
				color: "white",
			});
			return;
		}

		try {
			await companyServices.createCompany(activeCompany);

			Swal.fire({
				icon: "success",
				title: "Empresa guardada",
				showConfirmButton: true,
				confirmButtonText: "Aceptar",
				customClass: {
					confirmButton: "btn btn-success",
				},
				background: "black",
				color: "white",
				});
				
			setActiveCompany({
				nombre: "",
				razonSocial: "",
				cuit: 0,
				logo: "",
			});

			setShowModal(false);
			await refreshCompanyList();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: (error as any).message,
				showConfirmButton: true,
				confirmButtonText: "Aceptar",
				customClass: {
					confirmButton: "btn btn-danger",
				},
				background: "black",
				color: "white",
			});
		}
	};


	return (
		<div
			className="asideGeneral"
			style={{
				alignItems: "center",
				overflowY: "auto",
				width: "300px",
				}}>
			<h1 className="">Empresas</h1>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => setShowModal(true)}
				style={{
					borderRadius: "30px",
					border: "2px solid black",
					transition: "all 0.3s ease",
				}}>
				Agregar empresa
			</button>
			{showModal && (
				<AsideCompanyModal
					closeModal={setShowModal}
					handleChanges={handleChanges}
					handleAddCompany={handleSubmit}
				/>
			)}
			<ListCompany company={company} refreshCompanyList={refreshCompanyList} />
		</div>
	);
};

export default AsideCompany;
