import { useState } from "react";
import ProductsModal from "../ProductsModal/ProductsModal";

const checkBoxProductsTable = () => {
  return (
    <>
      {/* td q contiene check */}
      <svg
        style={{ width: "20px", height: "20px" }}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
      </svg>
    </>
  );
};

const buttonsOfProductsTable = () => {
  return (
    <>
      {/* items de ACCIONES */}
      <button style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      </button>
      <button style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16"
        >
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
        </svg>
      </button>
      <button style={{ backgroundColor: "#212529", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          style={{ width: "20px", height: "20px" }}
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </button>
    </>
  );
};
export const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="activeScreenAdmin" style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <h2>Filtrar por categoría:</h2>
          <select
            style={{
              color: "white",
              backgroundColor: "rgb(49, 49, 49)",
              border: "solid 1px white",
              height: "50px",
              borderRadius: "12px",
            }}
            id="categoriesOptions"
          >
            <option value="selectCategoryOption">
              Seleccione una categoría
            </option>
            <option value="promotions">PROMOCIONES</option>
            <option value="starter">ENTRADAS</option>
            <option value="choper">TORRES Y PICADAS</option>
            <option value="sides">TAPAS</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <button
            onClick={handleOpenModal}
            style={{
              color: "white",
              backgroundColor: "rgb(49, 49, 49)",
              border: "solid 1px white",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              padding: "5px",
            }}
            id="addProduct"
          >
            Agregar Producto{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </button>
          {isModalOpen && <ProductsModal onClose={handleCloseModal} />}
        </div>
      </div>

      <div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">NOMBRE</th>
              <th scope="col">PRECIO</th>
              <th scope="col">DESCRIPCION</th>
              <th scope="col">CATEGORIA</th>
              <th scope="col">HABILITADO</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Papas + cerveza</th>
              <td>$6300</td>
              <td>PAPAS M CERV G</td>
              <td>PROMOCIONES</td>
              <td>{checkBoxProductsTable()}</td>
              <td>{buttonsOfProductsTable()}</td>
            </tr>
            <tr>
              <th scope="row">Papas rusticas</th>
              <td>$4000</td>
              <td>PAPAS MEDIANA</td>
              <td>ENTRADAS</td>
              <td> {checkBoxProductsTable()}</td>
              <td>{buttonsOfProductsTable()}</td>
            </tr>
            <tr>
              <th scope="row">La bendita torre</th>
              <td>$31600</td>
              <td>EMPANADAS DEG.</td>
              <td>TORRES Y PICADAS</td>
              <td>{checkBoxProductsTable()}</td>
              <td>{buttonsOfProductsTable()}</td>
            </tr>
            <tr>
              <th scope="row">Peras en curcuma</th>
              <td>$7000</td>
              <td>PERAS P.M</td>
              <td>TAPAS</td>
              <td>{checkBoxProductsTable()}</td>
              <td>{buttonsOfProductsTable()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
