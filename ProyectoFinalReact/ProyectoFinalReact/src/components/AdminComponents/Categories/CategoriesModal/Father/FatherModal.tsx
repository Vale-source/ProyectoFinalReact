interface FatherModalProps {
    onClose: () => void;
  }
  
  const FatherModal: React.FC<FatherModalProps> = ({ onClose }) => {
    return (
      <div
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
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            width: "600px",
            height: "250px",
            padding: "10px",
            borderRadius: "5px",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px",
            border: "1px solid white",
            textAlign: "center",
          }}
        >
          <h2>Crear una categoria padre</h2>
          <input
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "500px",
              backgroundColor: "black",
              border: "1px solid white",
              color: "white",
            }}
            type="text"
            placeholder="Ingresa una denominación"
          />
          
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "10px",
                width: "150px",
                border: "1px solid white",
              }}
            >
              Cancelar
            </button>
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "10px",
                width: "150px",
                border: "1px solid white",
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default FatherModal;
  