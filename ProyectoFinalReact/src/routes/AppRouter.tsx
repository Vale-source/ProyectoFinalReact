import { Routes, Route } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import AsideCompany from "../components/AsideCompany/AsideCompany";
import CuerpoPrincipal from "../components/CuerpoPrincipal/CuerpoPrincipal";
import BodyAdmin from "../components/AdminComponents/MainBody/BodyAdmin";
import NavBarAdmin from "../components/AdminComponents/NavBar/NavBarAdmin";
import AsideAdmin from "../components/AdminComponents/Aside/AsideAdmin";

const MainView = () => (
	<>
		<NavBar />
		<AsideCompany />
		<CuerpoPrincipal />
	</>
);

const AdminView = () => (
	<>
		<NavBarAdmin />
		<BodyAdmin />
		<AsideAdmin />
	</>
);

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainView />} />
			<Route path="/admin" element={<AdminView />} />
		</Routes>
	);
};