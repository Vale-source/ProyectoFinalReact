import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartaSucursal from './CartaSucursal/CartaSucursal';

// Componente funcional CuerpoPrincipal
const CuerpoPrincipal = () => {
    // Usar el hook useSelector para obtener el estado de las sucursales del store
    const sucursales = useSelector((state: RootState) => state.sucursales);

    return (
        <div className='cuerpoPrincipal'>
            <div className="background-blur">
                {/* Se puede agregar un fondo borroso aquí si es necesario */}
            </div>
            <div className="content" style={{
                maxHeight: "830px", // Altura máxima para el contenedor
                overflowY: "auto", // Habilitar desplazamiento vertical si es necesario
                display: "flex", // Usar flexbox para alinear elementos
                flexWrap: "wrap", // Permitir que los elementos se envuelvan
            }}>
                {/* Mapeo a través de las sucursales y renderizar un componente CartaSucursal para cada una */}
                {sucursales.map((sucursal, index) => (
                    <div key={index}>
                        <CartaSucursal sucursal={sucursal}></CartaSucursal> {/* Pasar la sucursal como prop */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CuerpoPrincipal;

