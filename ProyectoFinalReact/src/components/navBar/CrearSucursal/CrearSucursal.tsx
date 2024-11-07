import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import { BranchServices } from "../../../services/branchServices";
import { useDispatch } from "react-redux";
import { setActiveCompany, addSucursal } from "../../../features/conectCompanyBranchSlice/conectCompanyBranchSlice";
import { useAppSelector } from "../../../hooks/hook";
import { RootState } from "../../../store/store";
import { ImagesServices } from "../../../services/imagesService";


// Definir las propiedades para el componente CrearSucursal
interface CrearSucursalProps {
	initialValues: ICreateSucursal; // Valores iniciales para los campos del formulario
	onClose: () => void; // Callback para manejar el cierre del formulario
}

// Definición del componente CrearSucursal
const CrearSucursal: React.FC<CrearSucursalProps> = ({
	initialValues,
	onClose,
}) => {
	// Estado para mantener los valores actuales del formulario
	const [sucursal, setSucursal] = useState<ICreateSucursal>(initialValues);
	const URL = "http://190.221.207.224:8090/sucursales" // Ensure this is correctly set in your environment variables

	const branchServices = new BranchServices(URL)
	const imageService = new ImagesServices(URL + "/images");
	const dispatch = useDispatch();
	const [file, setFile] = useState<File | null>(null);

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
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]); 
		}
	};


	// Manejar el envío del formulario
	// Manejar el envío del formulario
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario
		// Validar si el campo "Nombre de la sucursal" está vacío
		console.log(sucursal)
		const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

		if (!sucursal.nombre.trim()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Nombre de la sucursal\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.horarioApertura.trim()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Horario de apertura\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.horarioCierre.trim()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Horario de cierre\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.calle.trim()) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Nombre de la calle\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.idLocalidad) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Localidad\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.latitud) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Latitud\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.numero) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de la calle\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.cp) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Código postal\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.piso) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de piso\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		if (!sucursal.domicilio.nroDpto) {
			Swal.fire({
				icon: "error",
				title: "Todos los campos tienen que estar completos",
				text: "Falta completar el campo \"Número de departamento\"",
			});
			return; // Detener la ejecución si el campo está vacío
		}

		console.log(sucursal)
		try {
			if (file) {
				const image = await imageService.uploadImage(file);
				sucursal.logo = image.url;
			}
			const nuevaSucursal = await branchServices.createBranch(sucursal);
			dispatch(addSucursal(nuevaSucursal));
			onClose();
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Hubo un error al crear la sucursal",
			});
		}
	};

	return (
		<div className="overlay">
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
					<select name="select3" onChange={handleChange} className="div15">
						<option value="">Seleccione una Localidad</option>
						<option value="opcion1">Opción 1</option>
						<option value="opcion2">Opción 2</option>
						<option value="opcion3">Opción 3</option>
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
					{/* Campo para Pais */}

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

export default CrearSucursal;
