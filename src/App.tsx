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

function App() {
	// const [count, setCount] = useState(0)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="notifications" element={<NotificationsView />} />
					<Route path="teams" element={<TeamsView />} />
					<Route path="messages" element={<ChatWindow />} />
					<Route path="calls" element={<CallsView />} />
					<Route path="calendar" element={<CalendarView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
