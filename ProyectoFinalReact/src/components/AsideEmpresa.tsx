import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { RootState } from "../store/store";

interface IPropsEmpresas {
	name: string;
	socialReason: string;
	cuit: number;
	image: string | File | Blob | null;
}

const AsideEmpresa = () => {
    const [showModal, setShowModal] = useState(false);

	const company = useAppSelector((state: RootState) => state.asideSlice.value);

	const dispatch = useAppDispatch();



	return (
        <div className="asideGeneral">
            <h1 className="">Empresas</h1>

            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(true)}>
                Agregar empresa
            </button>
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Modal title
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">...</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Understood
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
	);
};

export default AsideEmpresa;
