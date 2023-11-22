// import { useState } from 'react'
import './index.css';
import { Home } from './views/Home/Home';
// import { Login } from './views/Login/Login'
// import { Register } from './views/Register/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { CalendarView } from './views/CalendarView/CalendarView';
import { CallsView } from './views/CallsView/CallsView';
import { NotificationsView } from './views/NotificationsView/Notifications';
import { TeamsView } from './views/TeamsView/TeamsView';
import Authenticated from './hoc/Authentication';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';

function App() {
	// const [count, setCount] = useState(0)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="notifications" element={<Authenticated><NotificationsView /></Authenticated>} />
					<Route path="teams" element={<Authenticated><TeamsView /></Authenticated>} />
					<Route path="messages" element={<Authenticated><ChatWindow /></Authenticated>} />
					<Route path="calls" element={<Authenticated><CallsView /></Authenticated>} />
					<Route path="calendar" element={<Authenticated><CalendarView /></Authenticated>} />
          <Route path="login" element={<Login />} />
          <Route path='register' element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
