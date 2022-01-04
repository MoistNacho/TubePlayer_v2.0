import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import "@fortawesome/fontawesome-free/js/all.js";
import { StoreProvider } from "./context/index";

ReactDOM.render(
	<BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
		<StoreProvider>
			<App />
		</StoreProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
