import { useState } from "react";
import FatherModal from "../CategoriesModal/Father/FatherModal";
import SonModal from "../CategoriesModal/Son/Son";

const ButtonOfDropDown = () => {
  return (
    <>
      <div style={{ justifySelf: "right" }}>
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
      </div>
    </>
  );
};

const ButtonsOfCategoriesTable = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    console.log("botonPresionado");
    setMenuVisible(!menuVisible);
  };

  const [isModalOpenSon, setModalOpenSon] = useState(false);

  const handleOpenModalSon = () => {
    setModalOpenSon(true);
  };

  const handleCloseModalSon = () => {
    setModalOpenSon(false);
  };

  return (
    <>
      {/* items de ACCIONES */}
      {/* boton despliegable */}
      <div>
        <button
          onClick={toggleMenu}
          style={{
            backgroundColor: "#212529",
            color: "white",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
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

        {/* boton agregar */}
        <button
          onClick={handleOpenModalSon}
          style={{ backgroundColor: "#212529", color: "white" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-file-earmark-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
          </svg>
        </button>
      </div>
      {isModalOpenSon && <SonModal onClose={handleCloseModalSon} />}

      {/* menu desplegable */}
      {menuVisible && foods()}
    </>
  );
};

const foods = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridColumn: "1 / span 2",
          gap: "10px",
          padding: "10px",
          backgroundColor: "#212529",
          color: "white",
          textAlign: "left",
          zIndex: 10,
        }}
      >
        <div>comida 1</div>
        <ButtonOfDropDown />
        <div>comida 2</div>
        <ButtonOfDropDown />
      </div>
    </>
  );
};

export const Categories = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="activeScreenAdmin">
      <div
        style={{ display: "flex", justifyContent: "right", padding: "10px" }}
      >
        <button
          onClick={handleOpenModal}
          style={{
            backgroundColor: "transparent",
            color: "red",
            border: "solid 1px red",
            borderRadius: "12px",
            padding: "5px",
          }}
        >
          Agregar una Categoría
        </button>

        {isModalOpen && <FatherModal onClose={handleCloseModal} />}
      </div>
      <div className="categoryFatherDiv">
        <div className="categoryFatherTitle">MENU</div>
        <div className="categoryFatherTitleButtons">
          <ButtonsOfCategoriesTable />
        </div>
      </div>
      <div className="categoryFatherDiv"
      >
        <div className="categoryFatherTitle">CAFETERIA</div>
        <div className="categoryFatherTitleButtons">
          <ButtonsOfCategoriesTable />
        </div>
      </div>
      <div className="categoryFatherDiv"
      >
        <div className="categoryFatherTitle">COCKTAILS</div>
        <div className="categoryFatherTitleButtons">
          <ButtonsOfCategoriesTable />
        </div>
      </div>
      <div className="categoryFatherDiv"
      >
        <div className="categoryFatherTitle">VINO POR COPA</div>
        <div className="categoryFatherTitleButtons">
          <ButtonsOfCategoriesTable />
        </div>
      </div>
    </div>
  );
};
