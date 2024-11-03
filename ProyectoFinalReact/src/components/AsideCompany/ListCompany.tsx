import { useEffect, useState } from "react";
import { AsideCompanyViewDataModal } from "./modals/AsideCompanyViewDataModal";
import { AsideCompanyEditModal } from "./modals/AsideCompanyEditModal";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";
import { useDispatch } from "react-redux";
import { setActiveCompany } from "../../features/conectCompanyBranchSlice/conectCompanyBranchSlice";


export const ListCompany = ({ company, refreshCompanyList }: { company: IEmpresa[], refreshCompanyList: () => Promise<void> }) => {

	const [selectedCompany, setSelectedCompany] = useState<IEmpresa | null>(null);
	const [selectedCompanyEdit, setSelectedCompanyEdit] = useState<IEmpresa | null>(null);
	const dispatch = useDispatch();
	useEffect(() => {
		refreshCompanyList();
	}, [refreshCompanyList]);

	const handleViewClick = (company: IEmpresa) => {
		setSelectedCompany(company);
	};

	const handleEditClick = (company: IEmpresa) => {
		setSelectedCompanyEdit(company);
	};

	const handleCloseModal = () => {
		setSelectedCompany(null);
	};

	const handleCloseEditModal = async () => {
		setSelectedCompanyEdit(null);
		await refreshCompanyList(); 
	};
	const handleCurrentCompany = (company: IEmpresa)=>{
		dispatch(setActiveCompany(company));
	}

	return (
		<div>
			{company.length > 0 ? (
				company.map((company: IEmpresa) => (
					<div
						className="card"
						key={company.id}
						style={{
							width: "100%",
							background: "#5C636A",
							color: "white",
							border: "2px solid black",
							justifyContent: "center",
							margin: "0.5rem",
						}}>
						<div className="card-body" id="cardBodyCompany" style={{ textAlign: "center" }}>
							<h5 className="card-title" style={{ textShadow: "2px black" }} onClick={() => handleCurrentCompany(company)}>
								{company.nombre}
							</h5>
							<p className="card-text" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
								<button
									type="button"
									className="btn btn-outline-light"
									style={{ transition: "all 0.3s ease" }}
									onClick={() => handleViewClick(company)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-eye-fill"
										viewBox="0 0 16 16">
										<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
										<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
									</svg>
								</button>
								<button
									type="button"
									className="btn btn-outline-light"
									style={{ transition: "all 0.3s ease" }}
									onClick={() => handleEditClick(company)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-pencil-fill"
										viewBox="0 0 16 16">
										<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
									</svg>
								</button>
							</p>
						</div>
					</div>
				))
			) : (
				<p>No companies available</p>
			)}
			{/* Modal para ver detalles */}
			{selectedCompany && (
				<AsideCompanyViewDataModal
					company={selectedCompany}
					onClose={handleCloseModal}
				/>
			)}
			{/* Modal para editar empresa */}
			{selectedCompanyEdit && (
				<AsideCompanyEditModal
					company={selectedCompanyEdit}
					onClose={handleCloseEditModal}
				/>
			)}
		</div>
	);
};