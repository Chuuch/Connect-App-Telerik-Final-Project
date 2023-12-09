import React, { useState } from 'react';
import axios from 'axios';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

interface GiphySearchProps {
  API_SEARCH: string;
  API_KEY: string;
  onGifClick: (gifUrl: string) => void;
}

const GiphySearch: React.FC<GiphySearchProps> = ({ API_SEARCH, API_KEY, onGifClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);

  const searchGifs = async () => {
    if (!searchTerm.trim()) {
      return; 
    }

    try {
      const response = await axios.get(API_SEARCH, {
        params: {
          api_key: API_KEY,
          q: searchTerm,
          limit: 5,
        },
      });

      setGifs(response.data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  const handleGifClick = (gifUrl: string) => {
    onGifClick(gifUrl);
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white dark:bg-tray-800 dark:bg-gray-700 dark:border-gray-500">
      <div className="flex items-center space-x-2 mb-4 ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs"
          className="p-2 md:h-4 md:w-4 border dark:border-gray-500 bg-white text-white dark:text-gray-300 dark:bg-gray-800 dark:outline-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-purple-500 flex-grow"
        />
        <button
          onClick={searchGifs}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2 overflow-y-auto max-h-64">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className="w-32 h-32 object-cover rounded-md cursor-pointer transition transform hover:scale-105"
            onClick={() => handleGifClick(gif.images.fixed_height.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default GiphySearch;
