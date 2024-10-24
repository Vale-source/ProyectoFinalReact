import React, { useState } from 'react';
import CrearSucursal from './CrearSucursal/CrearSucursal'; // Importar el componente CrearSucursal
import { useDispatch } from 'react-redux';
import { agregarSucursal } from '../sucursalesSlice'; // Importar la acción para agregar una sucursal

const NavBar = () => {
    // Valores iniciales para el formulario de sucursal
    const initialValues = {
        id: 0,
        nombreSucursal: '',
        selecPais: '',
        selecLocalidad: '',
        longitud: 0,
        timeAper: '',
        selcProvincia: '',
        latitud: 0,
        codigoPostal: 0,
        timeCierre: '',
        nombreCalle: '',
        numeroCalle: 0,
        numeroPiso: 0,
        numeroDepartamento: 0,
        urlImagen: '',
        habilitado: false
    };

    // Interfaz que define la estructura de una sucursal
    interface Sucursal {
        id: number;
        nombreSucursal: string;
        selecPais: string;
        selecLocalidad: string;
        longitud: number;
        timeAper: string;
        selcProvincia: string;
        latitud: number;
        codigoPostal: number;
        timeCierre: string;
        nombreCalle: string;
        numeroCalle: number;
        numeroPiso: number;
        numeroDepartamento: number;
        urlImagen: string;
        habilitado: boolean;
    }

    // Estado para controlar la visibilidad del popup
    const [showPopup, setShowPopup] = useState(false);

    // Función para cambiar el estado de visibilidad del popup
    const cambiarEstado = () => {
        setShowPopup(!showPopup);
    }

    // Usar dispatch para enviar acciones al store de Redux
    const dispatch = useDispatch();

    // Manejar el envío del formulario de sucursal
    const handleSubmit = (sucursal: Sucursal) => {
        dispatch(agregarSucursal(sucursal)); // Disparar la acción para agregar la sucursal
        setShowPopup(false); // Cerrar el popup después de enviar
    };

    return (
        <div className='NavBarGeneral'>
            <h1>Sucursales en: Nombre Empresa</h1> {/* Título de la barra de navegación */}
            <button type="button" className="btn btn-outline-secondary" onClick={cambiarEstado}>
                Agregar Sucursal
            </button>

            {showPopup && ( // Mostrar el popup si showPopup es verdadero
                <div className="popup-overlay">
                    <CrearSucursal
                        initialValues={initialValues} // Pasar valores iniciales al componente CrearSucursal
                        onClose={cambiarEstado} // Función para cerrar el popup
                        onSubmit={handleSubmit} // Función para manejar el envío del formulario
                    />
                </div>
            )}
        </div>
    );
}

export default NavBar;

