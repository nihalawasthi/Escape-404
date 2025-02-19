import React from 'react';
import { XCircle } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Game Over</h2>
          <p className="text-gray-600">
            You have used your 3 lives, can't play anymore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal