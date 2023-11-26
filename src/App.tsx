// import { useState } from 'react'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert } from './components/Alert/Alert';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { Loader } from './components/Loader/Loader';
import { Search } from './components/Search/Search';
import { auth } from './config/firebase-config';
import UserContext from './context/UserContext';
import './index.css';
import { getUserByID } from './services/users.services';
import { Status } from './utils/status';
import { CalendarView } from './views/CalendarView/CalendarView';
import { CallsView } from './views/CallsView/CallsView';
import { Home } from './views/Home/Home';
import { UserView } from './views/Home/UserView/UserView';
import { Login } from './views/Login/Login';
import { NotificationsView } from './views/NotificationsView/Notifications';
import { PrivacyView } from './views/PrivacyView/PrivacyView';
import { Register } from './views/Register/Register';
import { TeamsView } from './views/TeamsView/TeamsView';
import Authenticated from './hoc/Authentication';

export interface CurrentUserDB {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	avatarUrl: string;
	status: `${Status}`;
	phone: string;
	uid: string;
	isLogged: boolean;
}

function App() {
	const [user, loading, error] = useAuthState(auth)
	const [currentUserDB, setCurrentUserDB] = useState<CurrentUserDB & object>({});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			const uid = user?.uid;
			if (uid) {
				getUserByID(uid).then((userData) => {
					// const userData = snapshot.val()[Object.keys(snapshot.val())[0]];

					setCurrentUserDB((prev) => {
						return {
							...prev,
							uid: userData.uid,
							firstName: userData?.firstName || '', // TODO: because of old data
							lastName: userData?.lastName || '', // TODO: because of old data
							username: userData?.username,
							email: userData.email,
							avatarUrl: userData?.avatarUrl || '',
							status: userData?.status || Status.OFFLINE,
							phone: userData?.phone || '',
							isLogged: true,
						};
					});
				});
			} else {
				setCurrentUserDB((prev) => {
					return {
						...prev,
						isLoading: false,
					};
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	if (loading) {
		return (
			<Loader />
		);
	}

	if (error) {
		return (
			<Alert errMessage={error.message} />
		);
	}

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ currentUserDB, setCurrentUserDB }} >
				<Routes>
					{/* <Route path="/" element={<Home />} />
				<Route path="notifications" element={<Authenticated><NotificationsView /></Authenticated>} />
				<Route path="teams" element={<Authenticated><TeamsView /></Authenticated>} />
				<Route path="messages" element={<Authenticated><ChatWindow /></Authenticated>} />
				<Route path="calls" element={<Authenticated><CallsView /></Authenticated>} />
				<Route path="calendar" element={<Authenticated><CalendarView /></Authenticated>} />
				<Route path="login" element={<Login />} />
				<Route path='register' element={<Register />} /> */}
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={user ? <Home /> : <Login />}>
						<Route path="notifications" element={<Authenticated><NotificationsView /></Authenticated>} />
						<Route path="teams" element={<Authenticated><TeamsView /></Authenticated>} />
						<Route path="messages" element={<Authenticated><ChatWindow /></Authenticated>} />
						<Route path="calls" element={<Authenticated><CallsView /></Authenticated>} />
						<Route path="calendar" element={<Authenticated><CalendarView /></Authenticated>} />
						<Route path="user" element={<Authenticated><UserView /></Authenticated>} />
						<Route path="privacy" element={<Authenticated><PrivacyView /></Authenticated>} />
						<Route path="search/:query" element={<Authenticated><Search /></Authenticated>} />
					</Route>
				</Routes>
			</UserContext.Provider >
		</BrowserRouter >
	);
}

export default App;
