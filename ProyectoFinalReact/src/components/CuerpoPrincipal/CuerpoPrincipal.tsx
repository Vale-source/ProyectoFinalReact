import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import CartaSucursal from "./CartaSucursal/CartaSucursal";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { BranchServices } from "../../services/branchServices";
import { setSucursales } from "../../features/conectCompanyBranchSlice/conectCompanyBranchSlice";
import { IUpdateSucursal } from "../../types/dtos/sucursal/IUpdateSucursal";

// Componente funcional CuerpoPrincipal
const CuerpoPrincipal = () => {
    const dispatch = useDispatch();
    const cuerpoPrincipalState = useSelector((state: RootState) => state.conectCompanyBranchSlice);
    const idCompany = cuerpoPrincipalState.activeCompany?.id;
    const sucursales = cuerpoPrincipalState.sucursales;

    const URL = "http://190.221.207.224:8090"; // Ensure this is correctly set in your environment variables
    const branchServices = new BranchServices(URL + "/sucursales");

    const getAllSucursal = async (id: number) => {
        const branch: ISucursal[] = await branchServices.getAllBranchsByCompanyId(id);
		
        dispatch(setSucursales(branch));
    };

    useEffect(() => {
        if (idCompany !== undefined) {
            getAllSucursal(idCompany);
        }
    }, [idCompany]);

    return (
        <div className="cuerpoPrincipal">
            <div className="background-blur"></div>
            <div className="content" style={{ maxHeight: "830px", overflowY: "auto", display: "flex", flexWrap: "wrap" }}>
                {sucursales.map((data, index) => (
					<div key={`${index}-${index}`}>
                        <CartaSucursal sucursal={data as unknown as IUpdateSucursal} />
					</div>
                ))}
            </div>
        </div>
    );
};

export default CuerpoPrincipal;
