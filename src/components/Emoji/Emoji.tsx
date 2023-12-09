import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react';
import { MdOutlineEmojiEmotions } from 'react-icons/md';

interface EmojiProps {
  onEmojiSelect: (emoji: string) => void;
}

interface EmojiData {
  native?: string;
}

export const Emoji: React.FC<EmojiProps> = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji: EmojiData) => {
    if (emoji.native) {
      onEmojiSelect(emoji.native);
      setShowPicker(false);
    }
  };

  return (
    <div className="relative flex flex-row items-center">
      <div className="absolute right-10 bottom-10">
      {showPicker && (
        <Picker
          data={data}
          onSelect={handleEmojiSelect}
        />
      )}
      </div>
      <div className="">
        <MdOutlineEmojiEmotions
          className="md:h-5 md:w-5 lg:h-8 lg:w-6 fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 dark:hover-fill-purple-600 mt-1 cursor-pointer"
          onClick={() => setShowPicker(!showPicker)}
        />
      </div>
    </div>
  );
};