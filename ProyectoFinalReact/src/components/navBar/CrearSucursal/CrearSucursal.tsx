import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Definir la estructura de un objeto Sucursal (sucursal)
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

// Definir las propiedades para el componente CrearSucursal
interface CrearSucursalProps {
    initialValues: Sucursal; // Valores iniciales para los campos del formulario
    onSubmit: (sucursal: Sucursal) => void; // Callback para manejar el envío del formulario
    onClose: () => void; // Callback para manejar el cierre del formulario
}

// Definición del componente CrearSucursal
const CrearSucursal: React.FC<CrearSucursalProps> = ({ initialValues, onSubmit, onClose }) => {
    // Estado para mantener los valores actuales del formulario
    const [sucursal, setSucursal] = useState<Sucursal>(initialValues);

    // Efecto para actualizar el estado cuando cambian los valores iniciales
    useEffect(() => {
        setSucursal(initialValues);
    }, [initialValues]);

    // Manejar el cambio en los campos de entrada
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setSucursal(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value // Actualizar el estado según el tipo de entrada
        }));
    };

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario

        // Validar si el campo "Nombre de la sucursal" está vacío
        if (!sucursal.nombreSucursal) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Nombre de la sucursal\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Horario de apertura" está vacío
        if (!sucursal.timeAper) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Horario de apertura\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Horario de cierre" está vacío
        if (!sucursal.timeCierre) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Horario de cierre\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "País" está vacío
        if (!sucursal.selecPais) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"País\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Provincia" está vacío
        if (!sucursal.selcProvincia) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Provincia\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Nombre de la calle" está vacío
        if (!sucursal.nombreCalle) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Nombre de la calle\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Localidad" está vacío
        if (!sucursal.selecLocalidad) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Localidad\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Latitud" está vacío
        if (!sucursal.latitud) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Latitud\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Número de la calle" está vacío
        if (!sucursal.numeroCalle) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Número de la calle\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Código postal" está vacío
        if (!sucursal.codigoPostal) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Código postal\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Número de piso" está vacío
        if (!sucursal.numeroPiso) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Número de piso\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "Número de departamento" está vacío
        if (!sucursal.numeroDepartamento) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"Número de departamento\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Validar si el campo "URL de la imagen" está vacío
        if (!sucursal.urlImagen) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Falta completar el campo \"URL de la imagen\"",
            });
            return; // Detener la ejecución si el campo está vacío
        }

        // Si todos los campos están completos, llamar al prop onSubmit con la sucursal actualizada
        onSubmit(sucursal);
    };

    return (
        <div className="popUpCrearUnaSucursal">
            <h1 className="div1">Crear Sucursal</h1>
            <form onSubmit={handleSubmit}>
                {/* Campo para el nombre de la sucursal */}
                <input
                    type="text"
                    name="nombreSucursal"
                    placeholder="Nombre de la sucursal"
                    value={sucursal.nombreSucursal || ''}
                    onChange={handleChange}
                    className='div2'
                />
                {/* Campo para el horario de apertura */}
                <input
                    type="time"
                    name="timeAper"
                    placeholder="Ingrese un horario de apertura"
                    value={sucursal.timeAper || ''}
                    onChange={handleChange}
                    className='div3'
                />
                {/* Campo para el horario de cierre */}
                <input
                    type="time"
                    name="timeCierre"
                    placeholder="Ingrese un horario de cierre"
                    value={sucursal.timeCierre || ''}
                    onChange={handleChange}
                    className='div4'
                />
                <div className='div5'>
                    <label>Habilitado</label>
                    {/* Checkbox para habilitar/deshabilitar la sucursal */}
                    <input
                        type="checkbox"
                        name="habilitado"
                        checked={sucursal.habilitado}
                        onChange={handleChange}
                    />
                </div>
                {/* Dropdown para seleccionar un país */}
                <select name="selecPais" value={sucursal.selecPais || ''} onChange={handleChange} className='div6'>
                    <option>Seleccione un pais</option>
                    <option>Argentina</option>
                    <option>Chile</option>
                    <option>Peru</option>
                </select>
                {/* Dropdown para seleccionar una provincia */}
                <select name="selcProvincia" value={sucursal.selcProvincia || ''} onChange={handleChange} className='div7'>
                    <option>Seleccione una provincia</option>
                    <option>prov1</option>
                    <option>prov2</option>
                    <option>prov3</option>
                </select>
                {/* Campo para el nombre de la calle */}
                <input
                    type="text"
                    name="nombreCalle"
                    placeholder="Nombre de la calle"
                    value={sucursal.nombreCalle || ''}
                    onChange={handleChange}
                    className='div8'
                />
                {/* Dropdown para seleccionar una localidad */}
                <select name="selecLocalidad" value={sucursal.selecLocalidad || ''} onChange={handleChange} className='div9'>
                    <option>Seleccione localidad</option>
                    <option>Localidad1</option>
                    <option>Localidad2</option>
                    <option>Localidad3</option>
                </select>
                {/* Campo para la latitud */}
                <input
                    type="number"
                    name="latitud"
                    placeholder="Latitud"
                    value={sucursal.latitud !== 0 ? sucursal.latitud : ''}
                    onChange={handleChange}
                    className='div10'
                />
                {/* Campo para el número de la calle */}
                <input
                    type="number"
                    name="numeroCalle"
                    placeholder="Numero de la calle"
                    value={sucursal.numeroCalle !== 0 ? sucursal.numeroCalle : ''}
                    onChange={handleChange}
                    className='div11'
                />
                {/* Campo para el código postal */}
                <input
                    type="number"
                    name="codigoPostal"
                    placeholder="Codigo postal"
                    value={sucursal.codigoPostal !== 0 ? sucursal.codigoPostal : ''}
                    onChange={handleChange}
                    className='div12'
                />
                {/* Campo para el número de piso */}
                <input
                    type="number"
                    name="numeroPiso"
                    placeholder="Ingrese un numero de piso"
                    value={sucursal.numeroPiso !== 0 ? sucursal.numeroPiso : ''}
                    onChange={handleChange}
                    className='div13'
                />
                {/* Campo para el número de departamento */}
                <input
                    type="number"
                    name="numeroDepartamento"
                    placeholder="Ingrese un numero de departamento"
                    value={sucursal.numeroDepartamento !== 0 ? sucursal.numeroDepartamento : ''}
                    onChange={handleChange}
                    className='div14'
                />
                {/* Campo para la URL de la imagen */}
                <input
                    type="text"
                    name="urlImagen"
                    placeholder="URL de la imagen"
                    value={sucursal.urlImagen || ''}
                    onChange={handleChange}
                    className='div16'
                />
                <div className="divBotones">
                    {/* Botón para confirmar la creación de la sucursal */}
                    <button type="submit" className="btn btn-success div17" style={{ marginRight: "220px" }}>Confirmar</button>
                    {/* Botón para cancelar y cerrar el formulario */}
                    <button type="button" className="btn btn-danger div18" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CrearSucursal;
