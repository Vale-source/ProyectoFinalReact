
import { AppRouter } from "./routes/AppRouter";

import NavBarAdmin from "./components/NavBar/NavBarAdmin";
import BodyAdmin from "./components/MainBody/BodyAdmin";
import AsideAdmin from "./components/Aside/AsideAdmin";

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
