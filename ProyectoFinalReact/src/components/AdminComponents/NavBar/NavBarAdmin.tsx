import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBarAdmin = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const sucursalActiva = useSelector(
    (state: RootState) => state.conectCompanyBranchSlice.activeBranch
  );
  return (
    <div className="NavBarAdmin">
      <button onClick={handleNavigate}>
        <div>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "40px" }}>
            arrow_back
          </span>
        </div>
      </button>
      <h1>
        {sucursalActiva?.nombre} - {sucursalActiva?.empresa?.nombre}
      </h1>
    </div>
  );
};

export default NavBarAdmin;
