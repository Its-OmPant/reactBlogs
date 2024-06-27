import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/Authentication/authSlice.js";
import authService from "./appwrite/auth.service.js";
import { Header, Footer } from "./components/index.js";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((err) => {
				console.error("ERROR :: ", err);
			})
			.finally(() => setLoading(false));
	}, []);
	return !loading ? (
		<div className="min-h-screen bg-green-200 flex flex-wrap content-between">
			<div className="w-full block">
				<Header />
				<main>{/* <Outlet></Outlet> */}</main>
				<Footer />
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
}

export default App;
