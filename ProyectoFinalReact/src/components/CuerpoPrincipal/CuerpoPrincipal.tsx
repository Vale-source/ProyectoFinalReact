import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartaSucursal from "./CartaSucursal/CartaSucursal";

// Componente funcional CuerpoPrincipal
const CuerpoPrincipal = () => {
	// Usar el hook useSelector para obtener el estado de las sucursales del store
	const companyBranch = useSelector(
		(state: RootState) => state.conectCompanyBranchSlice
	);

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
				{companyBranch.sucursales.map((data, index) => (
					<div key={`${index}-${index}`}>
						<CartaSucursal sucursal={data} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CuerpoPrincipal;
