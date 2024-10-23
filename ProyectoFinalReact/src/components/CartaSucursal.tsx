import React, { useState } from 'react';
import ModalVerSucursal from './ModalVerSucursal';
import CrearSucursal from './CrearSucursal';
import { useDispatch } from 'react-redux';
import { actualizarSucursal } from './sucursalesSlice';

// Define la interfaz de tipo Sucursal para las propiedades que contendrá
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

// Componente funcional CartaSucursal que recibe una sucursal como prop
const CartaSucursal: React.FC<{ sucursal: Sucursal }> = ({ sucursal }) => {
    // Estados para mostrar los popups de ver y editar sucursal
    const [showPopupVerSucursal, setShowPopupVerSucursal] = useState(false);
    const [showPopupEditarSucursal, setShowPopupEditarSucursal] = useState(false);
    
    // Hook para despachar acciones de Redux
    const dispatch = useDispatch();
    
    // Función para alternar el estado del popup de edición
    const cambiarEstadoEditarSucursal = () => {
        setShowPopupEditarSucursal(!showPopupEditarSucursal);
    };

    // Función para alternar el estado del popup de visualización
    const cambiarEstadoVerSucursal = () => {
        setShowPopupVerSucursal(!showPopupVerSucursal);
    };

    // Función que maneja la actualización de la sucursal
    const handleSubmit = (sucursalActualizada: Sucursal) => {
        // Combina la sucursal actualizada con su ID original
        const sucursalConId = { ...sucursalActualizada, id: sucursal.id };
        // Despacha la acción para actualizar la sucursal en el estado global
        dispatch(actualizarSucursal(sucursalConId));
        console.log("Sucursal actualizada: ", sucursalConId);
        // Cierra el popup de edición
        setShowPopupEditarSucursal(false);
    };

    return (
        <div className="card card-prin" style={{
            height: "370px",
            width: '250px',
            margin: '20px',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            alignItems: "center",
            background: "black",
            color: "white",
            border: "1px solid white",
        }}>
            {/* Imagen de la sucursal */}
            <img src={sucursal.urlImagen} className="card-img-top" alt="..." style={{
                width: "170px",
            }} />
            <div className="card-body">
                {/* Títulos y texto de la sucursal */}
                <h5 className="card-title">{sucursal.nombreSucursal}</h5>
                <p className="card-text">Horario Apertura: {sucursal.timeAper}</p>
                <p className="card-text">Horario Cierre: {sucursal.timeCierre}</p>
                
                {/* Botones para interactuar con la sucursal */}
                <div style={{
                    display: 'flex',
                    justifyContent: "center",
                    gap: "30px",
                }}>
                    {/* Botón para la función principal (home) */}
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            margin: '5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                        <span
                            style={{
                                fontSize: '24px',
                                color: 'gray',
                            }}
                            className="material-symbols-outlined"
                        >
                            home
                        </span>
                    </button>
                    
                    {/* Botón para ver la sucursal */}
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            margin: '5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={cambiarEstadoVerSucursal} // Abre el popup para ver la sucursal
                    >
                        <span
                            style={{
                                fontSize: '24px',
                                color: 'gray',
                            }}
                            className="material-symbols-outlined"
                        >
                            visibility
                        </span>
                    </button>
                    
                    {/* Botón para editar la sucursal */}
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '10px',
                            margin: '5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        onClick={cambiarEstadoEditarSucursal} // Abre el popup para editar la sucursal
                    >
                        <span
                            style={{
                                fontSize: '24px',
                                color: 'gray',
                            }}
                            className="material-symbols-outlined"
                        >
                            edit
                        </span>
                    </button>
                </div>
            </div>
            {/* Mostrar el popup de ver sucursal si está activo */}
            {showPopupVerSucursal && (
                <div className="popup-overlay">
                    <ModalVerSucursal onClose={cambiarEstadoVerSucursal} sucursal={sucursal} />
                </div>
            )}
            {/* Mostrar el popup de editar sucursal si está activo */}
            {showPopupEditarSucursal && (
                <div className="popup-overlay">
                    <CrearSucursal initialValues={{ ...sucursal, id: sucursal.id }} onClose={cambiarEstadoEditarSucursal} onSubmit={handleSubmit} />
                </div>
            )}
        </div>
    )
}

export default CartaSucursal;

