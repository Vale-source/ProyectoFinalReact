import NavBar from "./components/navBar/NavBar";
import CuerpoPrincipal from "./components/CuerpoPrincipal/CuerpoPrincipal";
import { AppRouter } from "./routes/AppRouter";
import AsideCompany from "./components/AsideCompany/AsideCompany";
import BodyAdmin from "./components/AdminComponents/MainBody/BodyAdmin";
import NavBarAdmin from "./components/AdminComponents/NavBar/NavBarAdmin";
import AsideAdmin from "./components/AdminComponents/Aside/AsideAdmin";


function App() {
	return (
		<div className="parent">
			<AppRouter />
			<NavBar />
			<AsideCompany />
			<CuerpoPrincipal />
			<NavBarAdmin/>
			<BodyAdmin />
			<AsideAdmin />
		</div>
	);
}

export default App;
