import NavBar from "./components/NavBar";
import CuerpoPrincipal from "./components/CuerpoPrincipal";
import AsideEmpresa from "./components/AsideEmpresa";
import { AppRouter } from "./routes/AppRouter";

function App() {
	return (
		<div className="parent">
			<AppRouter />
			<AsideEmpresa />
			<NavBar />
			<CuerpoPrincipal />
		</div>
	);
}

export default App;
