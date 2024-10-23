import React, { useState } from 'react'
import CrearSucursal from './CrearSucursal'

const NavBar = () => {
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
        urlImagen:string;
        habilitado: boolean;
    }
    const [showPopup, setShowPopup] = useState(false)
    const cambiarEstado = () => {
        setShowPopup(!showPopup);
    }
    const agregarSucursal = (sucursal: Sucursal) => {
        console.log(sucursal)
        const nuevaSucursal = { 
            nombreSucursal: sucursal.nombreSucursal,
            selecPais: sucursal.selecPais,
            selecLocalidad: sucursal.selecLocalidad,
            longitud: sucursal.longitud,
            timeAper: sucursal.timeAper,
            selcProvincia: sucursal.selcProvincia,
            latitud: sucursal.latitud,
            codigoPostal: sucursal.codigoPostal,
            timeCierre: sucursal.timeCierre,
            nombreCalle: sucursal.nombreCalle,
            numeroCalle: sucursal.numeroCalle,
            numeroPiso: sucursal.numeroPiso,
            numeroDepartamento: sucursal.numeroDepartamento,
            habilitado: sucursal.habilitado,
            urlImagen: sucursal.urlImagen
        };
        setShowPopup(false);
    }
    return (
        <div className='NavBarGeneral'>
            <h1>Sucursales en: Nombre Empresa</h1>
            <button type="button" className="btn btn-outline-secondary" onClick={cambiarEstado}>Agregar Sucursal</button>
            {showPopup && (
                <div className="popup-overlay">
                    <CrearSucursal onClose={cambiarEstado} onSubmit={agregarSucursal} />
                </div>
            )}
        </div>
    )
}

export default NavBar
