import React from 'react';
import { Trophy } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
          <p className="text-gray-600">
            You've successfully completed the game!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinModal;