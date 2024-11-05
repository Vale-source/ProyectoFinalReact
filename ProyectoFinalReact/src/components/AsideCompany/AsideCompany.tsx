import { ICreateEmpresaDto } from "../../types/dtos/empresa/ICreateEmpresaDto";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { AsideCompanyModal } from "./modals/AsideCompanyModal";
import { ListCompany } from "./ListCompany";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { CompanyServices } from "../../services/companyServices";
import { ImagesServices } from "../../services/imagesService"; // Importamos el servicio de imágenes

const AsideCompany = () => {
	const [showModal, setShowModal] = useState(false);
	const [activeCompany, setActiveCompany] = useState<ICreateEmpresaDto>({
		nombre: "",
		razonSocial: "",
		cuit: 0,
		logo: "",
	});
	const [file, setFile] = useState<File | null>(null);

	const [company, setCompany] = useState<IEmpresa[]>([]);

	const URL = "http://190.221.207.224:8090";

	const companyServices = new CompanyServices(URL + "/empresas");

	const handleChanges = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const newValue = name === "cuit" && value !== "" ? Number(value) : value;

		setActiveCompany((prevState) => ({
			...prevState,
			[name]: newValue,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]); 
		}
	};

	const refreshCompanyList = async () => {
		const company: IEmpresa[] = await companyServices.getAllCompany();
		setCompany(company);
	};

	useEffect(() => {
		refreshCompanyList();
	}, []);

	
	const createCompanyWithImage = async (file: File, companyData: ICreateEmpresaDto) => {
		const imageService = new ImagesServices(URL + "/images");
		const companyService = new CompanyServices(URL + "/empresas");

		try {
			
			const image = await imageService.uploadImage(file);

			const newCompanyData: ICreateEmpresaDto = {
				...companyData,
				logo: image.url, 
			};

			
			await companyService.createCompany(newCompanyData);
		} catch (error) {
			console.error("Error al crear la empresa:", error);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Verifico que todos los campos estén llenos
		const allFieldsFilled = () => {
			return (
				activeCompany.nombre.trim() !== "" &&
				activeCompany.razonSocial.trim() !== "" &&
				activeCompany.cuit !== 0 &&
				file !== null // Verificamos que se haya seleccionado un archivo
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

		// Subir el archivo y crear la empresa
		try {
			await createCompanyWithImage(file as File, activeCompany);

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
			setFile(null); // Limpiamos el archivo seleccionado

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
		<div className="asideGeneral" style={{ alignItems: "center", overflowY: "auto", width: "300px" }}>
			<h1 className="">Empresas</h1>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={() => setShowModal(true)}
				style={{ borderRadius: "30px", border: "2px solid black", transition: "all 0.3s ease" }}
			>
				Agregar empresa
			</button>
			{showModal && (
				<AsideCompanyModal
					closeModal={setShowModal}
					handleChanges={handleChanges}
					handleAddCompany={handleSubmit}
					handleFileChange={handleFileChange} 
				/>
			)}
			<ListCompany company={company} refreshCompanyList={refreshCompanyList} />
		</div>
	);
};

export default AsideCompany;
