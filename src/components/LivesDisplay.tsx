import React from 'react';
import { Heart } from 'lucide-react';

interface LivesDisplayProps {
  lives: number;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives }) => {
  return (
    <div className="absolute bottom-4 right-4 flex space-x-2">
      {[...Array(3)].map((_, index) => (
        <Heart
          key={index}
          className={`w-8 h-8 transition-all ${
            index < lives
              ? 'text-red-500 fill-red-500'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default LivesDisplay;