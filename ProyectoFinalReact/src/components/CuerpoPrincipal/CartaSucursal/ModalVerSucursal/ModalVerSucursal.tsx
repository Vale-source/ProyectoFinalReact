import React from 'react';
import { IUpdateSucursal } from '../../../../types/dtos/sucursal/IUpdateSucursal';
// Definición de las propiedades del componente ModalVerSucursal
interface ModalVerSucursalProps {
    onClose: () => void; // Función para cerrar el modal
    sucursal: IUpdateSucursal; // Objeto sucursal que contiene los detalles de la sucursal
}

// Definición de la interfaz Sucursal

// Componente funcional ModalVerSucursal
const ModalVerSucursal: React.FC<ModalVerSucursalProps> = ({ onClose, sucursal }) => {
    return (
        <div className='modalVerSucursal'>
            <h2>Sucursal</h2> {/* Título del modal */}
            <div className='infoModalVerSucursal'>
                {/* Mostrar la información de la sucursal */}
                <h4>Nombre: {sucursal.nombre}</h4>
                <h4>Empresa: {sucursal.empresa.nombre}</h4> {/* Mismo nombre que la sucursal; puede que sea un error */}
                <h4>Domicilio: {sucursal.domicilio.calle} {sucursal.domicilio.numero}</h4>
                <h4>¿Casa Matriz?: {sucursal.esCasaMatriz ? 'Sí' : 'No'}</h4>
                <h4>Horario Apertura: {sucursal.horarioApertura}</h4>
                <h4>Horario Cierre: {sucursal.horarioCierre}</h4>
            </div>
            <div className="image-button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <img 
                    src={sucursal.logo ?? ''} 
                    alt="" 
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        marginBottom: '10px'
                    }} 
                />
                <button type="button" className="btn btn-danger" onClick={onClose}>Cerrar</button> {/* Botón para cerrar el modal */}
            </div>
        </div>
    )
}

export default ModalVerSucursal;

