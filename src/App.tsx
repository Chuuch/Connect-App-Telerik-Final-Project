// import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert } from './components/Alert/Alert';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { Loader } from './components/Loader/Loader';
import { auth } from './config/firebase-config';
import './index.css';
import { Home } from './views/Home/Home';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';
import { CalendarView } from './views/CalendarView/CalendarView';
import { CallsView } from './views/CallsView/CallsView';
import { TeamsView } from './views/TeamsView/TeamsView';
import { NotificationsView } from './views/NotificationsView/Notifications';


function App() {
	const [user, loading, error] = useAuthState(auth)

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
					<Route path="notifications" element={<NotificationsView />} />
					<Route path="teams" element={<TeamsView />} />
					<Route path="messages" element={<ChatWindow />} />
					<Route path="calls" element={<CallsView />} />
					<Route path="calendar" element={<CalendarView />} />
				</Route>
			</Routes>
		</BrowserRouter >
	);
}

export default App;
