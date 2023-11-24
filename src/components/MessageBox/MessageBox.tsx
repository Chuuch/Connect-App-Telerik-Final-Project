import { useState } from "react"
import { IoMdAttach, IoMdPhotos } from "react-icons/io"
import { createMsg } from "../../services/message.services";
import { Emoji } from "../Emoji/Emoji";


export const MessageBox = () => {
  const [msg, setMsg]= useState('');
  const [emoji, setEmoji] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		try {
      const completeMessage = `${msg} ${emoji}`.trim();
      if(completeMessage !== '') {
        const messageId = await createMsg(completeMessage);
        console.log('Message sent with ID:', messageId);
      }
      setMsg('');
      setEmoji('');
    } catch (error) {
      console.error('Message sent with error:', error);
    }
	};

  return (
    <div className="flex flex-grow h-32 border-t border-l bg-gray-100 text-gray-700 dark:bg-gray-900 dark:border-gray-600 items-center space-x-2 w-full">
      <div className='flex flex-grow items-center w-full ml-5 mr-2 space-x-2'>
      <input
        type="text"
        placeholder="Type something..."
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
        onKeyDown={(e)=>{if (e.key==='Enter'){handleSubmit(e)}}}
        required
        className="text-lg p-5 h-12 rounded-full w-full mr-5 bg-transparent border bg-white focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-purple-600 dark:text-gray-300 flex-grow outline-none focus:outline-none"/>
        <Emoji onEmojiSelect={setEmoji} /> 
        
      <IoMdAttach size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600'/>
      <IoMdPhotos size={30} className='cursor-pointer fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 hover:dark:fill-purple-600'/>
      </div>
      <div className='flex flex-row pr-5'>
      <button className=" p-2 w-24 h-10 rounded-md bg-blue-500 hover:bg-blue-500/90 dark:bg-purple-600/90 hover:bg-purple-600 text-white" 
      onClick={handleSubmit}>
        Send
      </button>
      </div>
    </div>
  )
}
