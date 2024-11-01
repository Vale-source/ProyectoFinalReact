import { useEffect, useState } from "react";
import CartaSucursal from "./CartaSucursal/CartaSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { BranchServices } from "../../services/branchServices";
// Componente funcional CuerpoPrincipal
const CuerpoPrincipal = () => {
	// Usar el hook useSelector para obtener el estado de las sucursales del store

	const idCompany = 1;
	const [sucursal, setSucursal] = useState<ISucursal[]>([]);

	const URL = "http://190.221.207.224:8090"; // Ensure this is correctly set in your environment variables
	const branchServices = new BranchServices(URL + "/sucursales");

	const getAllSucursal = async (id: number) => {
		const branch: ISucursal[] = await branchServices.getAllBranchsByCompanyId(
			id
		);
		setSucursal(branch);
	};

	useEffect(() => {
		getAllSucursal(idCompany);
	}, []);
	return (
		<div className="cuerpoPrincipal">
			<div className="background-blur">
				{/* Se puede agregar un fondo borroso aquí si es necesario */}
			</div>
			<div
				className="content"
				style={{
					maxHeight: "830px", // Altura máxima para el contenedor
					overflowY: "auto", // Habilitar desplazamiento vertical si es necesario
					display: "flex", // Usar flexbox para alinear elementos
					flexWrap: "wrap", // Permitir que los elementos se envuelvan
				}}>
				{sucursal.map((data, index) => (
					<div key={`${index}-${index}`}>
						<CartaSucursal sucursal={data} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CuerpoPrincipal;
