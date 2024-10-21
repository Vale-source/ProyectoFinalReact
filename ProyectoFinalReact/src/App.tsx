import NavBar from "./components/NavBar";
import CuerpoPrincipal from "./components/CuerpoPrincipal";
import AsideEmpresa from "./components/AsideEmpresa";

function App() {
  return (
    <div className="parent">
      <NavBar />
      <CuerpoPrincipal />
      <AsideEmpresa />
    </div>
  );
}

export default App;
