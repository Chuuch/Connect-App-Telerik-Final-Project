import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarFeature = () => {
    const [value, onChange] = useState<Value>(new Date());

  return (
<div className='p-4'>
  <Calendar
    onChange={onChange}
    value={value}
    className='w-full max-w-full bg-white text-gray-800 rounded-lg shadow-md font-sans leading-tight'
  />
</div>


  )
}
