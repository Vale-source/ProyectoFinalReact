
import { AppRouter } from "./routes/AppRouter";


import BodyAdmin from "./components/AdminComponents/MainBody/BodyAdmin";
import NavBarAdmin from "./components/AdminComponents/NavBar/NavBarAdmin";
import AsideAdmin from "./components/AdminComponents/Aside/AsideAdmin";


function App() {
	return (
		<div className="parent">
			<AppRouter />
			<NavBarAdmin/>
			<BodyAdmin />
			<AsideAdmin />
		</div>
	);
}

export default App;
