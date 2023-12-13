import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarFeature = () => {
	const [value, onChange] = useState<Value>(new Date());

	return (
		<div className="div">
			<motion.div
			initial={{ y: -100, opacity: 0 }}
			transition={{ duration: 1.2 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="p-4 shadow-inner">
				<Calendar
					onChange={onChange}
					value={value}
					className="
         			w-24 h-64 text-sm bg-white text-gray-800 rounded-lg shadow-md font-sans leading-tight"
				/>
			</motion.div>
			<motion.div
			initial={{ y: -100, opacity: 0 }}
			transition={{ duration: 1.2 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="flex items-center justify-center pt-5">
				<button className="bg-blue-500 hover:bg-blue-500/90 dark:bg-purple-600/90 dark:hover:bg-purple-600 text-white p-2 rounded-md text-sm">
					Create note
				</button>
			</motion.div>
		</div>
	);
};
