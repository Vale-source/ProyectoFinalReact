import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RootState } from "../../store/store";
import { IPropsEmpresas } from "./AsideCompany";
import { AsideCompanyViewDataModal } from "../modals/AsideCompanyViewDataModal";
import { AsideCompanyEditModal } from "../modals/AsideCompanyEditModal";
import Swal from "sweetalert2";
import { deleteCompany } from "../../features/asideSlice/asideSlice";

export const ListCompany = () => {
	const companyState = useAppSelector(
		(state: RootState) => state.asideSlice.value
	);

	const dispatch = useAppDispatch();

	const [selectedCompany, setSelectedCompany] = useState<IPropsEmpresas | null>(
		null
	);

	const [selectedCompanyEdit, setSelectedCompanyEdit] =
		useState<IPropsEmpresas | null>(null);

	const handleViewClick = (company: IPropsEmpresas) => {
		setSelectedCompany(company);
	};

	const handleEditClick = (company: IPropsEmpresas) => {
		setSelectedCompanyEdit(company);
	};

	const handleCloseModal = () => {
		setSelectedCompany(null);
	};

	const handleCloseEditModal = () => {
		setSelectedCompanyEdit(null);
	};

	const handleDeletCompany = (company: IPropsEmpresas) => {
		Swal.fire({
			icon: "warning",
			title: "¿Deseas eliminar la empresa?",
			showCancelButton: true,
			confirmButtonText: "Si",
			cancelButtonText: "Cancelar",
			customClass: {
				actions: "my-actions",
				cancelButton: "order-1 right-gap btn btn-danger",
				confirmButton: "order-2 btn btn-success",
			},
			background: "black",
			color: "white",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteCompany(company));
				Swal.fire({
					icon: "success",
					title: "Empresa eliminada",
					background: "black",
					color: "white",
					customClass: {
						confirmButton: "btn btn-success",
						
					},
				});
			}
		});
	};

	return (
		<div>
			{companyState.map((company) => (
				<div
					className="card"
					key={company.cuit}
					style={{
						width: "100%",
						background: "#5C636A",
						color: "white",
						border: "2px solid black",
						justifyContent: "center",
						margin: "0.5rem",
					}}>
					<div className="card-body" style={{ textAlign: "center" }}>
						<h5
							className="card-title"
							style={{
								textShadow: "2px black",
							}}>
							{company.name}
						</h5>
						<p
							className="card-text"
							style={{
								display: "flex",
								justifyContent: "center",
								gap: "10px",
							}}>
							<button
								type="button"
								className="btn btn-outline-light"
								style={{ transition: "all 0.3s ease" }}
								onClick={() => handleDeletCompany(company)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-trash-fill"
									viewBox="0 0 16 16">
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
								</svg>
							</button>
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
			))}
			{selectedCompany && (
				<AsideCompanyViewDataModal
					company={selectedCompany}
					onClose={handleCloseModal}
				/>
			)}
			{selectedCompanyEdit && (
				<AsideCompanyEditModal
					company={selectedCompanyEdit}
					onClose={handleCloseEditModal}
				/>
			)}
		</div>
	);
};
