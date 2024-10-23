import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartaSucursal from './CartaSucursal';
import ModalVerSucursal from './modalVerSucursal';


const CuerpoPrincipal = () => {
    const sucursales = useSelector((state: RootState) => state.sucursales);

    return (
        <div className='cuerpoPrincipal'>
            <div className="background-blur"></div>
            <div className="content">
                {sucursales.map((sucursal, index) => (
                    <div key={index}>
                        <CartaSucursal sucursal={sucursal}></CartaSucursal>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default CuerpoPrincipal
