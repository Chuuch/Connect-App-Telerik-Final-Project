// import { PiUserCircleFill } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { useEffect, useRef} from "react";
// import { auth } from "../../config/firebase-config";
import { Messages } from "../Messages/Messages";
import { MessageBox } from "../MessageBox/MessageBox";

export const Chat = () => {
    const msgRefContainer = useRef<HTMLDivElement | null>(null); 
    const location = useLocation();
    const results = location.state?.results || [];

    useEffect(() => {
      msgRefContainer.current?.scrollIntoView({behavior: 'smooth'});
    }, [results]);

    if (results.length===0) {
      return <div>
      <h1 >
          No results found
      </h1>
      
      </div>;
    }



  return (
    <div className="flex flex-col w-full">
      <div className="h-[710px] border-l dark:border-gray-600 shadow-inner overflow-auto">
        <Messages msg={results}/>
      </div>
      <div>
        <MessageBox />
      </div>
    </div>
  )
}
