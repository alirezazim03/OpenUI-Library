import React, { useState } from 'react';

const MoodEmojiReactionPanel = ({
  showCounters = true,
  onReaction = () => {},
  className = '',
}) => {
  const emojis = ['😄', '😢', '😲', '👍', '❤️', '😂', '😮', '😡'];
  const [reactions, setReactions] = useState(
    emojis.reduce((acc, emoji) => ({ ...acc, [emoji]: 0 }), {})
  );
  const [animating, setAnimating] = useState({});

  const handleReaction = (emoji) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: prev[emoji] + 1
    }));
    setAnimating(prev => ({ ...prev, [emoji]: true }));
    onReaction(emoji);

    // Remove animation after 500ms
    setTimeout(() => {
      setAnimating(prev => ({ ...prev, [emoji]: false }));
    }, 500);
  };

  return (
    <div className={`flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}>
      {emojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => handleReaction(emoji)}
          className={`relative flex items-center justify-center w-12 h-12 text-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
            animating[emoji] ? 'animate-bounce' : ''
          }`}
          aria-label={`React with ${emoji}`}
        >
          <span className="select-none">{emoji}</span>
          {showCounters && reactions[emoji] > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {reactions[emoji]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default MoodEmojiReactionPanel;
