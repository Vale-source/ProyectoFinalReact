import { Form } from "react-bootstrap";

interface ProductsModalProps {
  onClose: () => void;
}

const ProductsModal: React.FC<ProductsModalProps> = ({ onClose }) => {
  return (
    <div
      className="ProductsModalDiv"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(1px)",
      }}>
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          width: "700px",
          padding: "20px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          border: "1px solid white",
        }}>
        <h2>Crear un articulo</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            width: "100%",
          }}>
          <div
            className="inputsDivProductsModal"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresar una denominación"
            />
            <input type="text" name="category" placeholder="Categoría" />
            <input type="text" name="allergens" placeholder="Alergenos" />
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresa un precio de venta"
            />
            <input
              type="text"
              name="denominacion"
              placeholder="Ingresa un codigo"
            />
            <div
              style={{
                width: "100%",
                borderRadius: "5px",
                border: "1px solid white",
                padding: "10px",
                height: "40px",
              }}>
              <Form style={{ width: "30px", height: "30px" }}>
                <div key={`habilitado`} className="mb-3">
                  <Form.Check label={`Habilitado`} />
                </div>
              </Form>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
            <textarea
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
                backgroundColor: "black",
                border: "1px solid white",
                color: "white",
                height: "200px",
              }}
              placeholder="Ingrese una descripción"></textarea>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid white",
                padding: "10px",
                gap: "10px",
              }}>
              <div className="custom-file-upload">
                <label htmlFor="file-upload" className="file-upload-label">
                  Seleccionar archivo
                </label>
                <input accept="image/*" name="image" id="file-upload" type="file" />
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                fill="currentColor"
                className="bi bi-camera"
                viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
            }}>
            Cancelar
          </button>
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
            }}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsModal;
