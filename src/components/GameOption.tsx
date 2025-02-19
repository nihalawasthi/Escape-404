import React from 'react';
import { HelpCircle, Puzzle as PuzzlePiece, BookOpen, Pencil } from 'lucide-react';

interface GameOptionProps {
  type: 'question' | 'puzzle' | 'book' | 'pencil';
  onClick: () => void;
}

const GameOption: React.FC<GameOptionProps> = ({ type, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'question':
        return <HelpCircle className="w-10 h-10" />;
      case 'puzzle':
        return <PuzzlePiece className="w-10 h-10" />;
      case 'book':
        return <BookOpen className="w-10 h-10" />;
      case 'pencil':
        return <Pencil className="w-10 h-10" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-24 h-24 rounded-lg bg-white/90 shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center text-indigo-600 hover:scale-110"
    >
      {getIcon()}
    </button>
  );
};

export default GameOption;