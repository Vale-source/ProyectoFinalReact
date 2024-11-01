interface IPropsModalCompany {
	closeModal: (e: boolean) => void;
	handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddCompany: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AsideCompanyModal: React.FC<IPropsModalCompany> = ({
	closeModal,
	handleChanges,
	handleAddCompany,
}) => {
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
								Crear Empresa
							</h2>
						</div>
						<div
							className="modal-body"
							style={{
								margin: "0.4rem",
								padding: "0.4rem",
								justifyContent: "space-between",
							}}>
							<form onSubmit={handleAddCompany}>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="nombre"
										placeholder="Ingrese un nombre"
										aria-label="default input example"
										onChange={handleChanges}
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="razonSocial"
										placeholder="Ingrese una razon social"
										aria-label="default input example"
										onChange={handleChanges}
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="number"
										name="cuit"
										placeholder="Ingrese un CUIT"
										aria-label="default input example"
										onChange={handleChanges}
									/>
								</div>
								<div className="mb-3">
									<input
										className="form-control"
										type="text"
										name="logo"
										placeholder="Ingrese la URL de la imagen"
										aria-label="default input example"
										onChange={handleChanges}
									/>
								</div>
								<div className="modal-footer">
									<button
										type="submit"
										className="btn btn-success"
										style={{
											transition: "all 0.3s ease",
										}}>
										Confirmar
									</button>
									<button
										type="button"
										className="btn btn-danger"
										style={{
											transition: "all 0.3s ease",
										}}
										onClick={() => closeModal(false)}>
										Cancelar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
