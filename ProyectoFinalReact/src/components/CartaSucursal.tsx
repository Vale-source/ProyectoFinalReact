import React, { useState } from 'react'
import ModalVerSucursal from './ModalVerSucursal'
import CrearSucursal from './CrearSucursal'
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


const CartaSucursal: React.FC<{ sucursal: Sucursal }> = ({ sucursal }) => {
    const [showPopupVerSucursal, setShowPopupVerSucursal] = useState(false)
    const cambiarEstado = () => {
        setShowPopupVerSucursal(!showPopupVerSucursal);
    }

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
            <img src={sucursal.urlImagen} className="card-img-top" alt="..." style={{
                width: "170px",
            }} />
            <div className="card-body">
                <h5 className="card-title">{sucursal.nombreSucursal}</h5>
                <p className="card-text">Horario Apertura: {sucursal.timeAper}</p>
                <p className="card-text">Horario Cierre: {sucursal.timeCierre}</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: "center",
                        gap: "30px",
                    }}>
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
                        onClick={cambiarEstado}
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
                            edit
                        </span>
                    </button>
                </div>
            </div>
            {showPopupVerSucursal && (
                <div className="popup-overlay">
                    <ModalVerSucursal onClose={cambiarEstado} sucursal={sucursal}></ModalVerSucursal>
                </div>
            )}
            <CrearSucursal></CrearSucursal>
        </div>
    )
}

export default CartaSucursal
