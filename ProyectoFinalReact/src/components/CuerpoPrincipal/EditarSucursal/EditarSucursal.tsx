import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
import { BranchServices } from "../../../services/branchServices";
import { ImagesServices } from "../../../services/imagesService";
import { CountryServices } from "../../../services/countryServices";
import { ProvinceServices } from "../../../services/provinceServices";
import { LocalityServices } from "../../../services/localityServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateSucursal } from "../../../features/conectCompanyBranchSlice/conectCompanyBranchSlice";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IPais } from "../../../types/IPais";
import { IProvincia } from "../../../types/IProvincia";
import { ILocalidad } from "../../../types/ILocalidad";

// Definir las propiedades para el componente EditarSucursal
interface EditarSucursalProps {
    initialValues: IUpdateSucursal; // Valores iniciales para los campos del formulario
    sucursalActual: ISucursal;
    onClose: () => void; // Callback para manejar el cierre del formulario
}

// Definición del componente EditarSucursal
const EditarSucursal: React.FC<EditarSucursalProps> = ({
    initialValues,
    sucursalActual,
    onClose,
}) => {
    // Estado para mantener los valores actuales del formulario
    const [sucursal, setSucursal] = useState<IUpdateSucursal>(initialValues);
    const [paises, setPaises] = useState<IPais[]>([]);
    const [provincias, setProvincias] = useState<IProvincia[]>([]);
    const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const URL = "http://190.221.207.224:8090"; // Ensure this is correctly set in your environment variables
    const branchServices = new BranchServices(URL + "/sucursales");
    const imageService = new ImagesServices(URL + "/images");
    const paisService = new CountryServices(URL + "/paises");
    const provinciasService = new ProvinceServices(URL + "/provincias");
    const localidadesService = new LocalityServices(URL + "/localidades");

    const dispatch = useDispatch();
    const activeCompany = useSelector((state: RootState) => state.conectCompanyBranchSlice.activeCompany);

    const [selectedCountry, setSelectedCountry] = useState<number | null>(sucursalActual.domicilio.localidad.provincia.pais.id);
    const [selectedProvince, setSelectedProvince] = useState<number | null>(sucursalActual.domicilio.localidad.provincia.id);
    const [selectedLocality, setSelectedLocality] = useState<number | null>(sucursalActual.domicilio.localidad.id);

    // Obtener la lista de países cuando el componente se monte
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await paisService.getAll();
                setPaises(countriesData);
            } catch (error) {
                console.error("Error al obtener la lista de países:", error);
            }
        };
        fetchCountries();
    }, []);

    // Actualiza las provincias cuando el país cambia
    useEffect(() => {
        if (selectedCountry) {
            const fetchProvinces = async () => {
                try {
                    const provincesData = await provinciasService.getAllProvincesByCountry(selectedCountry);
                    setProvincias(provincesData);
                    setSelectedProvince(sucursalActual.domicilio.localidad.provincia.id); // Set initial province
                } catch (error) {
                    console.error("Error al obtener la lista de provincias:", error);
                }
            };
            fetchProvinces();
            setSelectedProvince(null); // Resetea la provincia al cambiar el país
            setSelectedLocality(null); // Resetea la localidad al cambiar el país
        }
    }, [selectedCountry]);

    // Actualiza las localidades cuando la provincia cambia
    useEffect(() => {
        if (selectedProvince) {
            const fetchLocalities = async () => {
                try {
                    const localitiesData = await localidadesService.getAllLocalitiesByProvince(selectedProvince);
                    setLocalidades(localitiesData);
                    setSelectedLocality(sucursalActual.domicilio.localidad.id); // Set initial locality
                } catch (error) {
                    console.error("Error al obtener la lista de localidades:", error);
                }
            };
            fetchLocalities();
            setSelectedLocality(null); // Resetea la localidad al cambiar la provincia
        }
    }, [selectedProvince]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(Number(event.target.value));
    };

    const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedProvince(Number(event.target.value));
    };

    const handleLocalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocality = Number(event.target.value);
        setSelectedLocality(newLocality);
        setSucursal((prevState) => ({
            ...prevState,
            domicilio: {
                ...prevState.domicilio,
                idLocalidad: newLocality,
            },
        }));
        console.log("hola"+newLocality);
        console.log(sucursal);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setSucursal((prevState) => {
            if (name in prevState.domicilio) {
                return {
                    ...prevState,
                    domicilio: {
                        ...prevState.domicilio,
                        [name]: type === "checkbox"
                            ? checked
                            : type === "number"
                                ? Number(value)
                                : value,
                    },
                };
            } else {
                return {
                    ...prevState,
                    [name]: type === "checkbox"
                        ? checked
                        : type === "number"
                            ? Number(value)
                            : value,
                };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del envío del formulario

        // Verificamos que el nombre solo contenga letras
        const nameVerify = () => {
            const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
            return nameRegex.test(sucursal.nombre);
        };

        // Verificamos que el nombre de la calle solo contenga letras
        const streetNameVerify = () => {
            const streetNameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
            return streetNameRegex.test(sucursal.domicilio.calle);
        };

        // Verificamos que el string ingresado sea una imagen, que comience con https
        const imageVerify = () => {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
            return sucursal.logo !== null && urlRegex.test(sucursal.logo);
        };

        // Verificamos que todos los campos estén llenos
        const allFieldsFilled = () => {
            return (
                sucursal.nombre.trim() !== "" &&
                sucursal.horarioApertura.trim() !== "" &&
                sucursal.horarioCierre.trim() !== "" &&
                sucursal.domicilio.calle.trim() !== "" &&
                sucursal.latitud !== 0 &&
                sucursal.longitud !== 0 &&
                sucursal.domicilio.numero !== 0 &&
                sucursal.domicilio.cp !== 0 &&
                sucursal.domicilio.piso !== 0 &&
                sucursal.domicilio.nroDpto !== 0 &&
                sucursal.logo?.trim() !== ""
            );
        };

        if (!allFieldsFilled()) {
            Swal.fire({
                icon: "error",
                title: "Todos los campos tienen que estar completos",
                text: "Completa todos los datos antes de guardar",
                background: "black",
                color: "white",
            });
            return;
        }

        if (!streetNameVerify()) {
            Swal.fire({
                icon: "error",
                title: "Ingrese un URL valido",
                background: "black",
                color: "white",
            });
            return;
        }

        if (!imageVerify()) {
            Swal.fire({
                icon: "error",
                title: "Ingrese un URL valido",
                background: "black",
                color: "white",
            });
            return;
        }

        if (!nameVerify()) {
            Swal.fire({
                icon: "error",
                title: "Ingrese un URL valido",
                background: "black",
                color: "white",
            });
            return;
        }

        try {
            let updatedSucursal = { ...sucursal };
            if (file) {
                const image = await imageService.uploadImage(file);
                updatedSucursal = {
                    ...updatedSucursal,
                    logo: image.url,
                };
            }
            console.log("Updated Sucursal:", updatedSucursal); // Añadir un log para verificar los datos
            await branchServices.put(initialValues.id, updatedSucursal);

            const sucursalActualizada = await branchServices.getById(initialValues.id);
            if (sucursalActualizada) {
                dispatch(updateSucursal(sucursalActualizada as ISucursal));
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo actualizar la sucursal",
                });
            }

            Swal.fire({
                icon: "success",
                title: "Sucursal actualizada",
                showConfirmButton: true,
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "btn btn-success",
                },
                background: "black",
                color: "white",
            });

            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un error al actualizar la sucursal",
            });
        }
    };

    return (
        <div className="overlay">
            <div className="popUpCrearUnaSucursal">
                <h1 className="div1">Editar Sucursal</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campo para el nombre de la sucursal */}
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la sucursal"
                        value={sucursal.nombre}
                        onChange={handleChange}
                        className="div2"
                    />
                    {/* Campo para el horario de apertura */}
                    <input
                        type="time"
                        name="horarioApertura"
                        placeholder="Ingrese un horario de apertura"
                        value={sucursal.horarioApertura}
                        onChange={handleChange}
                        className="div3"
                    />
                    {/* Campo para el horario de cierre */}
                    <input
                        type="time"
                        name="horarioCierre"
                        placeholder="Ingrese un horario de cierre"
                        value={sucursal.horarioCierre}
                        onChange={handleChange}
                        className="div4"
                    />
                    <div className="div5">
                        <label>Habilitado</label>
                        {/* Checkbox para habilitar/deshabilitar la sucursal */}
                        <input
                            type="checkbox"
                            name="esCasaMatriz"
                            checked={sucursal.esCasaMatriz}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="number"
                        name="latitud"
                        placeholder="Latitud"
                        value={sucursal.latitud}
                        onChange={handleChange}
                        className="div6"
                    />
                    <input
                        type="number"
                        name="longitud"
                        placeholder="longitud"
                        value={sucursal.longitud}
                        onChange={handleChange}
                        className="div7"
                    />
                    {/* Campo para el nombre de la calle */}
                    <input
                        type="text"
                        name="calle"
                        placeholder="Nombre de la calle"
                        value={sucursal.domicilio.calle}
                        onChange={handleChange}
                        className="div8"
                    />
                    <input
                        type="number"
                        name="numero"
                        placeholder="Numero de la calle"
                        value={sucursal.domicilio.numero}
                        onChange={handleChange}
                        className="div9"
                    />
                    {/* Campo para el código postal */}
                    <input
                        type="number"
                        name="cp"
                        placeholder="Codigo postal"
                        value={sucursal.domicilio.cp}
                        onChange={handleChange}
                        className="div10"
                    />
                    {/* Campo para el número de piso */}
                    <input
                        type="number"
                        name="piso"
                        placeholder="Ingrese un numero de piso"
                        value={sucursal.domicilio.piso}
                        onChange={handleChange}
                        className="div11"
                    />
                    {/* Campo para el número de departamento */}
                    <input
                        type="number"
                        name="nroDpto"
                        placeholder="Ingrese un numero de departamento"
                        value={sucursal.domicilio.nroDpto}
                        onChange={handleChange}
                        className="div12"
                    />
                    {/* Select para País */}
                    <label>País:</label>
                    <select value={selectedCountry || ''} onChange={handleCountryChange}>
                        <option value="">Seleccione un país</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.id}>
                                {pais.nombre}
                            </option>
                        ))}
                    </select>

                    {/* Select para Provincia */}
                    <label>Provincia:</label>
                    <select value={selectedProvince || ''} onChange={handleProvinceChange} disabled={!selectedCountry}>
                        <option value="">Seleccione una provincia</option>
                        {provincias.map((provincia) => (
                            <option key={provincia.id} value={provincia.id}>
                                {provincia.nombre}
                            </option>
                        ))}
                    </select>

                    {/* Select para Localidad */}
                    <label>Localidad:</label>
                    <select value={selectedLocality || ''} onChange={handleLocalityChange} disabled={!selectedProvince}>
                        <option value="">Seleccione una localidad</option>
                        {localidades.map((localidad) => (
                            <option key={localidad.id} value={localidad.id}>
                                {localidad.nombre}
                            </option>
                        ))}
                    </select>
                    {/* Campo para la URL de la imagen */}
                    <div className="mb-3 div16">
                        <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ paddingLeft: "20px" }}
                        />
                    </div>
                    <div className="divBotones">
                        {/* Botón para confirmar la edición de la sucursal */}
                        <button
                            type="submit"
                            className="btn btn-success div17"
                            style={{ marginRight: "220px" }}>
                            Confirmar
                        </button>
                        {/* Botón para cancelar y cerrar el formulario */}
                        <button
                            type="button"
                            className="btn btn-danger div18"
                            onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarSucursal;
