import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarSucursal } from './sucursalesSlice';

interface crearUnaSucursalProps {
    initialValues: Sucursal;
    onClose: () => void;
    onSubmit: (sucursal: Sucursal) => void;
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
    urlImagen:string;
    habilitado: boolean;
}
const CrearSucursal: React.FC<crearUnaSucursalProps> = ({ initialValues,onClose, onSubmit }) => {
    const [nombreSucursal, setNombreSucursal] = useState<string>('');
    const [selecPais, setSelecPais] = useState<string>('');
    const [selecLocalidad, setSelecLocalidad] = useState<string>('');
    const [longitud, setLongitud] = useState<number | undefined>(undefined);
    const [timeAper, setTimeAper] = useState<string>('');
    const [selcProvincia, setSelcProvincia] = useState<string>('');
    const [latitud, setLatitud] = useState<number | undefined>(undefined);
    const [codigoPostal, setCodigoPostal] = useState<number | undefined>(undefined);
    const [timeCierre, setTimeCierre] = useState<string>('');
    const [nombreCalle, setNombreCalle] = useState<string>('');
    const [numeroCalle, setNumeroCalle] = useState<number | undefined>(undefined);
    const [numeroPiso, setNumeroPiso] = useState<number | undefined>(undefined);
    const [numeroDepartamento, setNumeroDepartamento] = useState<number | undefined>(undefined);
    const [habilitado, setHabilitado] = useState<boolean>(false);
    const [urlImagen , setUrlImagen] = useState<string>("");

    const manejoNombreSucursal = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNombreSucursal(evento.target.value);
    }
    const manejoPais = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setSelecPais(evento.target.value);
    }
    const manejoLocalidad = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setSelecLocalidad(evento.target.value);
    }
    const manejoLongitud = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setLongitud(Number(evento.target.value));
    }
    const manejoTimeAper = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setTimeAper(evento.target.value);
    }
    const manejoProvincia = (evento: React.ChangeEvent<HTMLSelectElement>) => {
        setSelcProvincia(evento.target.value);
    }
    const manejoLatitud = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setLatitud(Number(evento.target.value));
    }
    const manejoCodigoPostal = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setCodigoPostal(Number(evento.target.value));
    }
    const manejoTimeCierre = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setTimeCierre(evento.target.value);
    }
    const manejoNombreCalle = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNombreCalle(evento.target.value);
    }
    const manejoNumeroCalle = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroCalle(Number(evento.target.value));
    }
    const manejoNumeroPiso = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroPiso(Number(evento.target.value));
    }
    const manejoNumeroDepartamento = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setNumeroDepartamento(Number(evento.target.value));
    }
    const manejoHabilitado = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setHabilitado(evento.target.checked);
    }
    const manejoUrlImagen = (evento: React.ChangeEvent<HTMLInputElement>) => {
        setUrlImagen((evento.target.value));
    }
    const dispatch = useDispatch();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nuevaSucursal: Sucursal = {
            nombreSucursal,
            selecPais,
            selecLocalidad,
            latitud: latitud ?? 0,
            longitud: longitud ?? 0,
            codigoPostal: codigoPostal ?? 0,
            numeroPiso: numeroPiso ?? 0,
            timeAper,
            timeCierre,
            habilitado,
            selcProvincia,
            nombreCalle,
            numeroCalle: numeroCalle ?? 0,
            numeroDepartamento: numeroDepartamento ?? 0,
            urlImagen
        };
        dispatch(agregarSucursal(nuevaSucursal));
        onSubmit(nuevaSucursal);
        // Limpiar el formulario
    };


    return (
        <>
            <div className="popUpCrearUnaSucursal">
                <h1 className="div1">Crear Sucursal</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ingrese un nombre"
                        value={nombreSucursal}
                        onChange={manejoNombreSucursal}
                        className='div2'
                    />
                    <input
                        type="time"
                        placeholder="Ingrese un horario de apertura"
                        value={timeAper}
                        onChange={manejoTimeAper}
                        className='div3'
                    />
                    <input
                        type="time"
                        placeholder="Ingrese un horario de cierre"
                        value={timeCierre}
                        onChange={manejoTimeCierre}
                        className='div4'
                    />
                    <div className='div5'>
                        <label >Habilitado</label>
                        <input
                            type="checkbox"
                            checked={habilitado}
                            onChange={manejoHabilitado}
                        />
                    </div>
                    <select value={selecPais} onChange={manejoPais} className='div6'>
                        <option>Seleccione un pais</option>
                        <option>Argentina</option>
                        <option>Chile</option>
                        <option>Peru</option>
                    </select>
                    <select value={selcProvincia} onChange={manejoProvincia} className='div7'>
                        <option>Seleccione una provincia</option>
                        <option>prov1</option>
                        <option>prov2</option>
                        <option>prov3</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Nombre de la calle"
                        value={nombreCalle}
                        onChange={manejoNombreCalle}
                        className='div8'
                    />
                    <select value={selecLocalidad} onChange={manejoLocalidad} className='div9'>
                        <option>Seleccione localidad</option>
                        <option>Localidad1</option>
                        <option>Localidad2</option>
                        <option>Localidad3</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Latitud"
                        value={latitud}
                        onChange={manejoLatitud}
                        className='div10'
                    />
                    <input
                        type="number"
                        placeholder="Numero de la calle"
                        value={numeroCalle}
                        onChange={manejoNumeroCalle}
                        className='div11'
                    />
                    <input
                        type="number"
                        placeholder="Longitud"
                        value={longitud}
                        onChange={manejoLongitud}
                        className='div12'
                    />
                    <input
                        type="number"
                        placeholder="Codigo postal"
                        value={codigoPostal}
                        onChange={manejoCodigoPostal}
                        className='div13'
                    />
                    <input
                        type="number"
                        placeholder="Ingrese un numero de piso"
                        value={numeroPiso}
                        onChange={manejoNumeroPiso}
                        className='div14'
                    />
                    <input
                        type="number"
                        placeholder="Ingrese un numero de departamento"
                        value={numeroDepartamento}
                        onChange={manejoNumeroDepartamento}
                        className='div15'
                    />
                    <div className="elegirImagen div16">
                        <input 
                        type='url'
                        placeholder='URL de la imagen'
                        value={urlImagen}
                        onChange={manejoUrlImagen}></input>
                    </div>
                        <div className='div17'><button type="submit" className="btn btn-success botonesCrearSucursal">Confirmar</button></div>
                        <div className='div18'><button type="button" className="btn btn-danger  botonesCrearSucursal" onClick={onClose}>Cancelar</button></div>
                </form>
            </div>
        </>
    );
};

export default CrearSucursal
