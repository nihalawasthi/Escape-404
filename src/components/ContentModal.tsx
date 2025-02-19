import React, { useState } from 'react';
import { Content } from '../data/content';
import MemoryGame from './MemoryGame';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (isCorrect: boolean) => void;
  content: Content;
}

const ContentModal: React.FC<ContentModalProps> = ({ isOpen, onClose, onSubmit, content }) => {
  const [gameCompleted, setGameCompleted] = useState(false);

  if (!isOpen) return null;

  const handleGameComplete = (success: boolean) => {
    setGameCompleted(true);
    setTimeout(() => {
      onSubmit(success);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 mb-6">
          {content.type === 'puzzle' 
            ? "Match all the pairs in less than 15 moves to proceed!"
            : "Complete this task to continue..."}
        </p>
        
        {content.type === 'puzzle' ? (
          <MemoryGame onComplete={handleGameComplete} />
        ) : (
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Complete
            </button>
          </div>
        )}

        {gameCompleted && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-white">
              Game completed! Processing result...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModal;