import React from 'react'

interface ModalVerSucursalProps {
    onClose: () => void;
    sucursal: Sucursal;
}
interface Sucursal {
    nombreSucursal: string
    selecPais: string
    selecLocalidad: string
    longitud: number
    timeAper: string;
    selcProvincia: string;
    latitud: number
    codigoPostal: number;
    timeCierre: string;
    nombreCalle: string;
    numeroCalle: number;
    numeroPiso: number;
    numeroDepartamento: number;
    urlImagen: string;
    habilitado: boolean;
}
const ModalVerSucursal: React.FC<ModalVerSucursalProps> = ({ onClose,sucursal }) => {
    return (
        <div className='modalVerSucursal'>
            <h2>Surcusal</h2>
            <div className='infoModalVerSucursal'>
                <h4>Nombre: {sucursal.nombreSucursal} </h4>
                <h4>Empresa: {sucursal.nombreSucursal} </h4>
                <h4>Domicilio: {sucursal.nombreCalle} {sucursal.numeroCalle} </h4>
                <h4>¿Casa Matriz?: {sucursal.habilitado ? 'Sí' : 'No'} </h4>
                <h4>Horario Apertura: {sucursal.timeAper} </h4>
                <h4>Horario Cierre: {sucursal.timeCierre} </h4>
            </div>
            <div className="image-button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <img src={sucursal.urlImagen} alt="Imagen de la sucursal" style={{
                    width: "170px",
                }} />
                <button type="button" className="btn btn-danger" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ModalVerSucursal
