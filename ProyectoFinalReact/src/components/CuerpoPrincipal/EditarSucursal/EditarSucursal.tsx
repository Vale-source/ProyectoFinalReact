import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BranchServices } from "../../../services/branchServices";
import { useDispatch, useSelector } from "react-redux";
import { updateSucursal } from "../../../features/conectCompanyBranchSlice/conectCompanyBranchSlice";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { RootState } from "../../../store/store";
import { ImagesServices } from "../../../services/imagesService";

// Definir las propiedades para el componente CrearSucursal
interface EditarSucursalProps {
	initialValues: IUpdateSucursal;// Valores iniciales para los campos del formulario
	onClose: () => void; // Callback para manejar el cierre del formulario
}

// Definición del componente CrearSucursal
const EditarSucursal: React.FC<EditarSucursalProps> = ({
	initialValues,
	onClose,
}) => {
	// Estado para mantener los valores actuales del formulario
	const [sucursal, setSucursal] = useState<IUpdateSucursal>(initialValues);
	const URL = "http://190.221.207.224:8090" // Ensure this is correctly set in your environment variables

	const branchServices = new BranchServices(URL+"/sucursales")
	const imageService = new ImagesServices(URL + "/images");
	const [file, setFile] = useState<File | null>(null);

	const dispatch = useDispatch();
	const activeCompany = useSelector((state: RootState) => state.conectCompanyBranchSlice.activeCompany);
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]); 
		}
	};


	// Manejar el cambio en los campos de entrada
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target as HTMLInputElement;
		const checked = (e.target as HTMLInputElement).checked;
		setSucursal((prevState) => {
			if (name in prevState.domicilio) {
				return {
					...prevState,
					domicilio: {
						...prevState.domicilio,
						[name]: type === "checkbox"
							? checked
							: type === "number"
								? Number(value)
								: value,
					},
				};
			} else {
				return {
					...prevState,
					[name]: type === "checkbox"
						? checked
						: type === "number"
							? Number(value)
							: value,
				};
			}
		});
	};


	// Manejar el envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario
		// Validar si el campo "Nombre de la sucursal" está vacío
		console.log(sucursal)
		const textPattern = /^[a-zA-Z0-9ñÑ\s]+$/;
		const imageVerify = () => {
			const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
			return sucursal.logo !== null && urlRegex.test(sucursal.logo);
		};


		if (!sucursal.nombre || !textPattern.test(sucursal.nombre)) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Nombre de la sucursal\" correctamente",
			});
			return; // Detener la ejecución si el campo está vacío o no cumple con el patrón
		}

		// Validar si el campo "Horario de apertura" está vacío
		if (!sucursal.horarioApertura) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Horario de apertura\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Horario de cierre" está vacío
		if (!sucursal.horarioCierre) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Horario de cierre\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Nombre de la calle" está vacío o no cumple con el patrón
		if (!sucursal.domicilio.calle || !textPattern.test(sucursal.domicilio.calle)) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Nombre de la calle\" correctamente",
			});
			return; // Detener la ejecución si el campo está vacío o no cumple con el patrón
		}

		// Validar si el campo "Localidad" está vacío
		if (!sucursal.domicilio.id) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Localidad\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Latitud" está vacío
		if (!sucursal.latitud) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Latitud\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Número de la calle" está vacío
		if (!sucursal.domicilio.numero) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de la calle\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Código postal" está vacío
		if (!sucursal.domicilio.cp) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Código postal\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Número de piso" está vacío
		if (!sucursal.domicilio.piso) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de piso\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Validar si el campo "Número de departamento" está vacío
		if (!sucursal.domicilio.nroDpto) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de departamento\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}
		if (!file && !imageVerify()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Logo de la sucursal\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		// Verificar que idEmpresa esté presente
		console.log(sucursal.idEmpresa)
		if (!sucursal.idEmpresa) {
			if (activeCompany) {
				setSucursal((prevState) => ({
					...prevState,
					idEmpresa: activeCompany.id,
				}));
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "No se pudo obtener el ID de la empresa",
				});
				return;
			}
		}

		try {
			let updatedSucursal = { ...sucursal };
			if (file) {
				const image = await imageService.uploadImage(file);
				updatedSucursal = {
					...updatedSucursal,
					logo: image.url,
				};
			}
			console.log(sucursal.idEmpresa)
			await branchServices.put(initialValues.id, updatedSucursal);
			const sucursalActualizada = await branchServices.getById(initialValues.id)
			if (sucursalActualizada) {
				dispatch(updateSucursal(sucursalActualizada as ISucursal));
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					text: "No se pudo actualizar la sucursal",
				});
			}
			onClose();
			console.log(sucursalActualizada)
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Hubo un error al actualizar la sucursal",
			});
		}
	};

	return (
		<div className="overlay">
			<div className="popUpCrearUnaSucursal">
				<h1 className="div1">Editar Sucursal</h1>
				<form onSubmit={handleSubmit}>
					{/* Campo para el nombre de la sucursal */}
					<input
						type="text"
						name="nombre"
						placeholder="Nombre de la sucursal"
						value={sucursal.nombre}
						onChange={handleChange}
						className="div2"
					/>
					{/* Campo para el horario de apertura */}
					<input
						type="time"
						name="horarioApertura"
						placeholder="Ingrese un horario de apertura"
						value={sucursal.horarioApertura}
						onChange={handleChange}
						className="div3"
					/>
					{/* Campo para el horario de cierre */}
					<input
						type="time"
						name="horarioCierre"
						placeholder="Ingrese un horario de cierre"
						value={sucursal.horarioCierre}
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
						value={sucursal.latitud}
						onChange={handleChange}
						className="div6"
					/>
					<input
						type="number"
						name="longitud"
						placeholder="longitud"
						value={sucursal.longitud}
						onChange={handleChange}
						className="div7"
					/>
					{/* Campo para el nombre de la calle */}
					<input
						type="text"
						name="calle"
						placeholder="Nombre de la calle"
						value={sucursal.domicilio.calle}
						onChange={handleChange}
						className="div8"
					/>
					<input
						type="number"
						name="numero"
						placeholder="Numero de la calle"
						value={sucursal.domicilio.numero}
						onChange={handleChange}
						className="div9"
					/>
					{/* Campo para el código postal */}
					<input
						type="number"
						name="cp"
						placeholder="Codigo postal"
						value={sucursal.domicilio.cp}
						onChange={handleChange}
						className="div10"
					/>
					{/* Campo para el número de piso */}
					<input
						type="number"
						name="piso"
						placeholder="Ingrese un numero de piso"
						value={sucursal.domicilio.piso}
						onChange={handleChange}
						className="div11"
					/>
					{/* Campo para el número de departamento */}
					<input
						type="number"
						name="nroDpto"
						placeholder="Ingrese un numero de departamento"
						value={sucursal.domicilio.nroDpto}
						onChange={handleChange}
						className="div12"
					/>
					<select name="select1" onChange={handleChange} className="div13">
						<option value="">Seleccione un Pais</option>
						<option value="opcion1">Opción 1</option>
						<option value="opcion2">Opción 2</option>
						<option value="opcion3">Opción 3</option>
					</select>
					{/* Campo para Provincias */}
					<select name="select2" onChange={handleChange} className="div14">
						<option value="">Seleccione una Provincia</option>
						<option value="opcion1">Opción 1</option>
						<option value="opcion2">Opción 2</option>
						<option value="opcion3">Opción 3</option>
					</select>
					{/* Campo para Localidad*/}
					<select
						name="idLocalidad"
						onChange={handleChange}
						className="div15"
						value={sucursal.domicilio.idLocalidad}
					>
						<option value="">Seleccione una Localidad</option>
						<option value={1}>Opción 1</option>
						<option value={2}>Opción 2</option>
						<option value={3}>Opción 3</option>
					</select>
					{/* Campo para la URL de la imagen */}
					<div className="mb-3 div16">
						<input
							className="form-control"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							style={{paddingLeft:"20px"}}
						/>
					</div>
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
		</div>
	);
	
};

export default EditarSucursal;
