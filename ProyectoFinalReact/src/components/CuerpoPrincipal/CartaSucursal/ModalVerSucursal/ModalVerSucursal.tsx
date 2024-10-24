import React from 'react';

// Definición de las propiedades del componente ModalVerSucursal
interface ModalVerSucursalProps {
    onClose: () => void; // Función para cerrar el modal
    sucursal: Sucursal; // Objeto sucursal que contiene los detalles de la sucursal
}

// Definición de la interfaz Sucursal
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

// Componente funcional ModalVerSucursal
const ModalVerSucursal: React.FC<ModalVerSucursalProps> = ({ onClose, sucursal }) => {
    return (
        <div className='modalVerSucursal'>
            <h2>Sucursal</h2> {/* Título del modal */}
            <div className='infoModalVerSucursal'>
                {/* Mostrar la información de la sucursal */}
                <h4>Nombre: {sucursal.nombreSucursal}</h4>
                <h4>Empresa: {sucursal.nombreSucursal}</h4> {/* Mismo nombre que la sucursal; puede que sea un error */}
                <h4>Domicilio: {sucursal.nombreCalle} {sucursal.numeroCalle}</h4>
                <h4>¿Casa Matriz?: {sucursal.habilitado ? 'Sí' : 'No'}</h4>
                <h4>Horario Apertura: {sucursal.timeAper}</h4>
                <h4>Horario Cierre: {sucursal.timeCierre}</h4>
            </div>
            <div className="image-button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src={sucursal.urlImagen} alt="Imagen de la sucursal" style={{
                    width: "170px", // Ancho de la imagen
                }} />
                <button type="button" className="btn btn-danger" onClick={onClose}>Cerrar</button> {/* Botón para cerrar el modal */}
            </div>
        </div>
    )
}

export default ModalVerSucursal;

