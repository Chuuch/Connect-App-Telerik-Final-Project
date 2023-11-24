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
    <div className="relative inline-block">
      {showPicker && (
        <Picker
          data={data}
          onSelect={handleEmojiSelect}
          className="absolute bottom-12 right-0 z-10"
        />
      )}
      <div className="relative">
        <MdOutlineEmojiEmotions
          size={25}
          className="fill-blue-500 hover:fill-blue-500/90 dark:fill-purple-600/90 dark:hover-fill-purple-600 mt-1 cursor-pointer"
          onClick={() => setShowPicker(!showPicker)}
        />
      </div>
    </div>
  );
};