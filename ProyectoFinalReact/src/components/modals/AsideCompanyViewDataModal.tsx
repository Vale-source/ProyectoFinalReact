import { FC } from "react";
import { IPropsEmpresas } from "../AsideCompany/AsideCompany";

interface IPropsAsideViewData {
	company: IPropsEmpresas | null;
	onClose: () => void;
}

export const AsideCompanyViewDataModal: FC<IPropsAsideViewData> = ({
	company,
	onClose,
}) => {
	if (!company) return null;

	return (
		<div>
			<div
				className="modal fade show"
				style={{
					display: "block",
					backdropFilter: "blur(10px)",
				}}>
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div
						className="modal-content"
						style={{
							background: "black",
							border: "1px solid white",
						}}>
						<div className="modal-header" style={{ justifyContent: "center" }}>
							<h2
								className="modal-title fs-5"
								id="staticBackdropLabel"
								style={{ color: "white" }}>
								<h2>{company.name}</h2>
							</h2>
						</div>
						<div
							className="modal-body"
							style={{
								margin: "0.4rem",
								padding: "0.4rem",
								justifyContent: "space-between",
							}}>
							<p>Razón Social: {company.socialReason}</p>
							<p>CUIT: {company.cuit}</p>
							<img
								src={company.image}
								className="rounded mx-auto d-block"
								alt={company.name}
								style={{
									height: "50%",
									width: "50%",
									margin: "1rem",
								}}
							/>
							<div
								className="modal-footer"
								style={{
									justifyContent: "center",
								}}>
								<button
									type="button"
									className="btn btn-danger"
									style={{
										transition: "all 0.3s ease",
									}}
									onClick={() => onClose()}>
									Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
