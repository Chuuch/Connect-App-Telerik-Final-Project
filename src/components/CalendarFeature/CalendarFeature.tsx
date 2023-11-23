import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarFeature = () => {
	const [value, onChange] = useState<Value>(new Date());

	return (
		<div className="div">
			<div className="flex items-center justify-center border-b border-purple-600 p-2">
				<h2 className="text-blue-500 dark:text-purple-600 text-2xl font-bold p-2 ">
					Calendar
				</h2>
			</div>

			<div className="p-4 shadow-inner">
				<Calendar
					onChange={onChange}
					value={value}
					className="
          w-full max-w-full bg-white text-gray-800 rounded-lg shadow-md font-sans leading-tight"
				/>
			</div>
			<div className="flex items-center justify-center pt-5">
				<button className="bg-blue-500 hover:bg-blue-500/90 dark:bg-purple-600/90 dark:hover:bg-purple-600 text-white p-2 rounded-md text-sm">
					Create note
				</button>
			</div>
		</div>
	);
};
