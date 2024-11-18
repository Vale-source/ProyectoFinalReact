import CrearSucursal from "./CrearSucursal/CrearSucursal"; // Importar el componente CrearSucursal
import { useState } from "react";
import { useAppSelector } from "../../hooks/hook";
import { RootState } from "../../store/store";
import { ICreateSucursal } from "../../types/dtos/sucursal/ICreateSucursal";
import React from "react";
// Interfaz que define la estructura de una sucursal

const NavBar = () => {
	// Obtener el estado de la empresa activa desde el store
	const navBarState = useAppSelector(
		(state: RootState) => state.conectCompanyBranchSlice
	);

	// Valores iniciales para el formulario de sucursal
	const initialValues: ICreateSucursal = {
		nombre: "",
		horarioApertura: "",
		horarioCierre: "",
		esCasaMatriz: false,
		latitud: 0,
		longitud: 0,
		domicilio: {
			calle: "",
			numero: 0,
			cp: 0,
			piso: 0,
			nroDpto: 0,
			idLocalidad: 0,
		},
		idEmpresa: navBarState.activeCompany?.id ?? 0,
		logo: "",
	};

	// Estado para controlar la visibilidad del popup
	const [showPopup, setShowPopup] = useState(false);

	// Función para cambiar el estado de visibilidad del popup
	const cambiarEstado = () => {
		setShowPopup(!showPopup);
		console.log(initialValues)
	};

	return (
		<div className="NavBarGeneral">
			<h1>Sucursales en: {navBarState.activeCompany?.nombre} </h1>{" "}
			{/* Título de la barra de navegación */}
			<button
				type="button"
				className="btn btn-outline-secondary"
				onClick={cambiarEstado}>
				Agregar Sucursal
			</button>
			{showPopup && ( // Mostrar el popup si showPopup es verdadero
				<div className="popup-overlay">
					<CrearSucursal
						initialValues={initialValues} // Pasar valores iniciales al componente CrearSucursal
						onClose={cambiarEstado} // Función para cerrar el popup
					/>
				</div>
			)}
		</div>
	);
};

export default NavBar;
