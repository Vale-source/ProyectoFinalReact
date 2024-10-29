import NavBar from "./components/navBar/NavBar";
import CuerpoPrincipal from "./components/CuerpoPrincipal/CuerpoPrincipal";
import { AppRouter } from "./routes/AppRouter";
import AsideCompany from "./components/AsideCompany/AsideCompany";

function App() {
	return (
		<div className="parent">
			<AppRouter />
			<NavBar />
			<AsideCompany />
			<CuerpoPrincipal />
		</div>
	);
}

export default App;
