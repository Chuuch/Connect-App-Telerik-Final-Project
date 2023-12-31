import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert } from './components/Alert/Alert';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { Loader } from './components/Loader/Loader';
import { Search } from './components/Search/Search';
import { auth } from './config/firebase-config';
import UserContext from './context/UserContext';
import Authenticated from './hoc/Authentication';
import './index.css';
import { User, getUserByID } from './services/users.services';
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
import DyteVideo from './components/DyteVideo/DyteVideo';
import { Chat } from './components/ChatWithFriend/ChatWithFriend';

function App() {
	const [user, loading, error] = useAuthState(auth)
	const [currentUserDB, setCurrentUserDB] = useState<User | object>({});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			const uid = user?.uid;
			if (uid) {
				getUserByID(uid).then((userData) => {
					setCurrentUserDB((prev) => {
						return {
							...prev,
							uid: userData?.uid,
							firstName: userData?.firstName || '',
							lastName: userData?.lastName || '',
							username: userData?.username,
							email: userData?.email,
							avatar: userData?.avatar || '',
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
	}, [currentUserDB]);

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
				<Toaster />
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={user ? <Home /> : <Login />}>
						<Route path="notifications" element={<Authenticated><NotificationsView /></Authenticated>} />
						<Route path="teams" element={<Authenticated><TeamsView /></Authenticated>} >
							<Route path=":teamId/:channelId" element={<Authenticated><></></Authenticated>} />
						</Route>
						<Route path="messages" element={<Authenticated><ChatWindow /></Authenticated>} />
						<Route path="calls" element={<Authenticated><CallsView /></Authenticated>} />
						<Route path="calendar" element={<Authenticated><CalendarView /></Authenticated>} />
						<Route path="user" element={<Authenticated><UserView /></Authenticated>} />
						<Route path="privacy" element={<Authenticated><PrivacyView /></Authenticated>} />
						<Route path="search/:chatId/:query" element={<Authenticated><Search /></Authenticated>} />
						<Route path='videocall' element={<Authenticated><DyteVideo /></Authenticated>} />
						<Route path='messages/videocall' element={<Authenticated><DyteVideo /></Authenticated>} />
						<Route path='chat/:chatId' element={<Authenticated><Chat /></Authenticated>} />
					</Route>
				</Routes>
			</UserContext.Provider >
		</BrowserRouter >
	);
}

export default App;
