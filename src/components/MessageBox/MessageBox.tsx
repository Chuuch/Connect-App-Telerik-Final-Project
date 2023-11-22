import { useState } from "react"
import { IoMdAttach, IoMdPhotos } from "react-icons/io"
import { createMsg } from "../../services/message.services";
// import { Emoji } from "../Emoji/Emoji"


export const MessageBox = () => {
  const [msg, setMsg]= useState('')

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		try {
      const messageId = await createMsg(msg);
      setMsg('');
      console.log('Message sent with ID:', messageId);
    } catch (error) {
      console.error('Message sent with error:', error);
    }
	};

  return (
    <div className="flex flex-row h-32 border-t-2 items-center space-x-2 w-full">
      <div className='flex flex-row items-center w-full ml-5 mr-2 space-x-2'>
      <input
        type="text"
        placeholder="Type something..."
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        onKeyDown={(e)=>{if (e.key==='Enter'){handleSubmit(e)}}}
        required
        className="text-lg p-5 h-12 rounded-full w-full mr-5 bg-transparent border-2 flex-grow outline-none focus:outline-none"/>
        {/* <Emoji />  */}
        
      <IoMdAttach size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90'/>
      <IoMdPhotos size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90'/>
      </div>
      <div className='flex flex-row pr-5'>
      <button className="border p-2 w-24 h-10 rounded-md bg-blue-500 hover:bg-blue-500/90 text-white" 
      onClick={handleSubmit}>
        Send
      </button>
      </div>
    </div>
  )
}
