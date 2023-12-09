import { CalendarFeature } from "../../components/CalendarFeature/CalendarFeature"

export const CalendarView = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-grow items-start justify-start">
      <div className="h-[830px] md:w-[276px] md:h-[682px] lg:h-full lg:w-[350px] shadow-xl bg-gray-100 dark:bg-gray-900">
        <CalendarFeature />
      </div>
      <div className="flex flex-col items-center justify-center lg:ml-[600px] lg:mt-[200px] space-y-4">
				<img src="connect2.png" alt="logo" className="lg:w-32 lg:h-32" />
				<h1 className="flex flex-row items-center justify-center text-6xl tracking-[10px] text-blue-500 dark:text-purple-500">
					Calendar
				</h1>
				<p className="uppercase text-slate-400 tracking-[20px]">
					Buddy Connect
				</p>
			</div>
    </div>
  )
}
