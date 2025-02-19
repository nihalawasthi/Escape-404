import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute bottom-16 left-4 bg-white/90 rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2">
      <Clock className="w-5 h-5 text-indigo-600" />
      <span className="text-lg font-bold text-indigo-600">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;