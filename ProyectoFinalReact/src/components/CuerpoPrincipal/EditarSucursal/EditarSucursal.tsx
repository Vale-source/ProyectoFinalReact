import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { BranchServices } from "../../../services/branchServices";

// Definir las propiedades para el componente CrearSucursal
interface CrearSucursalProps {
	initialValues: ISucursal; // Valores iniciales para los campos del formulario
	onClose: () => void; // Callback para manejar el cierre del formulario
}

// Definición del componente CrearSucursal
const EditarSucursal: React.FC<CrearSucursalProps> = ({
	initialValues,
	onClose,
}) => {
	// Estado para mantener los valores actuales del formulario
	const [sucursal, setSucursal] = useState<ISucursal>(initialValues);
	const [isCreated, setIsCreated] = useState(false);
  const idCompany = 1;
	const URL = "http://190.221.207.224:8090"; // Ensure this is correctly set in your environment variables
	const branchServices = new BranchServices(URL + "/sucursales");

	const getAllSucursal = async (id: number) => {
		const branch: ISucursal = await branchServices.getAllBranchsByCompanyId(
			id
		);
		setSucursal(branch);
	};

	useEffect(() => {
		getAllSucursal(idCompany);
	}, []);

	useEffect(() => {
		if (isCreated) {
			setIsCreated(false);
		}
	}, [isCreated]);

	// Manejar el cambio en los campos de entrada
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target as HTMLInputElement;
		const checked = (e.target as HTMLInputElement).checked;
		setSucursal((prevState) => ({
			...prevState,
			[name]: type === "checkbox" ? checked : value, // Actualizar el estado según el tipo de entrada
		}));
	};

	// Manejar el envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario

		// Verificamos que el nombre solo contenga letras
		const nameVerify = () => {
			const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
			return nameRegex.test(sucursal.nombre);
		};

		// Verificamos que el nombre de la calle solo contenga letras
		const streetNameVerify = () => {
			const streetNameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
			return streetNameRegex.test(sucursal.domicilio.calle);
		};

		// Verificamos que el string ingresado sea una imagen, que comience con https
		const imageVerify = () => {
			const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
			return (
				sucursal.logo !== null &&
				sucursal.logo !== undefined &&
				urlRegex.test(sucursal.logo)
			);
		};

		// Verificamos que todos los campos estén llenos
		const allFieldsFilled = () => {
			return (
				sucursal.nombre.trim() !== "" &&
				sucursal.horarioApertura.trim() !== "" &&
				sucursal.horarioCierre.trim() !== "" &&
				sucursal.domicilio.calle.trim() !== "" &&
				sucursal.latitud !== 0 &&
				sucursal.longitud !== 0 &&
				sucursal.domicilio.numero !== 0 &&
				sucursal.domicilio.cp !== 0 &&
				sucursal.domicilio.piso !== 0 &&
				sucursal.domicilio.nroDpto !== 0 &&
				sucursal.logo?.trim() !== ""
			);
		};

		if (!allFieldsFilled()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Completa todos los datos antes de guardar",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!streetNameVerify()) {
			Swal.fire({
				icon: "error",
				title: "Ingrese un URL valido",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!imageVerify()) {
			Swal.fire({
				icon: "error",
				title: "Ingrese un URL valido",
				background: "black",
				color: "white",
			});
			return;
		}

		if (!nameVerify()) {
			Swal.fire({
				icon: "error",
				title: "Ingrese un URL valido",
				background: "black",
				color: "white",
			});
			return;
		}

		try {
			await branchServices.post(sucursal);

			Swal.fire({
				icon: "success",
				title: "Sucursal creada",
				showConfirmButton: true,
				confirmButtonText: "Aceptar",
				customClass: {
					confirmButton: "btn btn-success",
				},
				background: "black",
				color: "white",
			});

			setIsCreated(true); // Actualizar el estado para indicar que se ha creado una sucursal
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "No se pudo crear la sucursal",
				background: "black",
				color: "white",
			});
		}
		// Si todos los campos están completos y correctos, llamar al prop onSubmit con la sucursal actualizada
		onClose();
	};

	return (
		<div className="popUpCrearUnaSucursal">
			<h1 className="div1">Crear Sucursal</h1>
			<form onSubmit={handleSubmit}>
				{/* Campo para el nombre de la sucursal */}
				<input
					type="text"
					name="nombre"
					placeholder="Nombre de la sucursal"
					onChange={handleChange}
					className="div2"
				/>
				{/* Campo para el horario de apertura */}
				<input
					type="time"
					name="horarioApertura"
					placeholder="Ingrese un horario de apertura"
					onChange={handleChange}
					className="div3"
				/>
				{/* Campo para el horario de cierre */}
				<input
					type="time"
					name="horarioCierre"
					placeholder="Ingrese un horario de cierre"
					onChange={handleChange}
					className="div4"
				/>
				<div className="div5">
					<label>Habilitado</label>
					{/* Checkbox para habilitar/deshabilitar la sucursal */}
					<input
						type="checkbox"
						name="esCasaMatriz"
						checked={sucursal.esCasaMatriz}
						onChange={handleChange}
					/>
				</div>

				<input
					type="number"
					name="latitud"
					placeholder="Latitud"
					onChange={handleChange}
					className="div6"
				/>
				<input
					type="number"
					name="longitud"
					placeholder="longitud"
					onChange={handleChange}
					className="div7"
				/>
				{/* Campo para el nombre de la calle */}
				<input
					type="text"
					name="calle"
					placeholder="Nombre de la calle"
					onChange={handleChange}
					className="div8"
				/>
				<input
					type="number"
					name="numero"
					placeholder="Numero de la calle"
					onChange={handleChange}
					className="div9"
				/>
				{/* Campo para el código postal */}
				<input
					type="number"
					name="cp"
					placeholder="Codigo postal"
					onChange={handleChange}
					className="div10"
				/>
				{/* Campo para el número de piso */}
				<input
					type="number"
					name="piso"
					placeholder="Ingrese un numero de piso"
					onChange={handleChange}
					className="div11"
				/>
				{/* Campo para el número de departamento */}
				<input
					type="number"
					name="nroDpto"
					placeholder="Ingrese un numero de departamento"
					onChange={handleChange}
					className="div12"
				/>
				<input
					type="number"
					name="idLocalidad"
					onChange={handleChange}
					placeholder="Ingrese el ID de la localidad"
					className="div13"
				/>
				{/* Campo para la URL de la imagen */}
				<input
					type="text"
					name="logo"
					placeholder="URL de la imagen"
					onChange={handleChange}
					className="div14"
				/>
				<div className="divBotones">
					{/* Botón para confirmar la creación de la sucursal */}
					<button
						type="submit"
						className="btn btn-success div17"
						style={{ marginRight: "220px" }}>
						Confirmar
					</button>
					{/* Botón para cancelar y cerrar el formulario */}
					<button
						type="button"
						className="btn btn-danger div18"
						onClick={onClose}>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditarSucursal;
