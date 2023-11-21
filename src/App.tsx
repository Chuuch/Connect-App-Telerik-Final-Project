// import { useState } from 'react'
import './index.css';
import { Home } from './views/Home/Home';
// import { Login } from './views/Login/Login'
// import { Register } from './views/Register/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Teams } from './components/Teams/Teams';
import { Calls } from './views/Calls/Calls';
import { Notifications } from './views/Notifications/Notifications';
import { ChatWindow } from './components/ChatWindow/ChatWindow';

function App() {
	// const [count, setCount] = useState(0)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}>
					<Route path="notifications" element={<Notifications />} />
					<Route path="teams" element={<Teams />} />
					<Route path="messages" element={<ChatWindow />} />
					<Route path="calls" element={<Calls />} />
					<Route path="calendar" element={<Teams />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
