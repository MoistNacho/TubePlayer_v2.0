import React, { useContext, useEffect, useState } from "react";
import { store } from "./context/index";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/mainPage.jsx";
import SearchPage from "./pages/searchPage/searchPage";
import WatchPage from "./pages/watchPage/watchPage";
import { useLocation } from "react-router";
import FavorModal from "./components/favorModal/favorModal";
import FavorPop from "./components/favorPop/favorPop";

const App = () => {
	const location = useLocation();
	const [modal, setModal] = useState(false);
	const [state] = useContext(store);

	const useQuery = () => {
		const { search } = useLocation();

		return React.useMemo(() => new URLSearchParams(search), [search]);
	};

	useEffect(() => {
		setModal(false);
	}, [location]);

	useEffect(() => {
		console.log(state.activate);
	}, [state]);

	const openModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			<Header openModal={openModal} />
			<FavorModal modal={modal} closeModal={closeModal} />
			<FavorPop state={state.activate} />
			<Routes>
				<Route path="/" element={<MainPage modal={modal} />} />
				<Route
					path="/result"
					element={<SearchPage useQuery={useQuery} modal={modal} />}
				/>
				<Route path="/watch" element={<WatchPage useQuery={useQuery} />} />
			</Routes>
		</>
	);
};

export default App;
