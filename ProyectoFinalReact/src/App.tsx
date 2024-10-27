import NavBar from "./components/NavBar";
import CuerpoPrincipal from "./components/CuerpoPrincipal";
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
