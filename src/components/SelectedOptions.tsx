import React, { useRef, useEffect } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight, ArrowDown, Undo } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { undoLastMove } from '../store/gameSlice';

interface SelectedOptionsProps {
  moves: string[];
}

const getArrowIcon = (move: string) => {
  switch (move) {
    case 'up':
      return <ArrowUp className="w-6 h-6 text-indigo-600" />;
    case 'left':
      return <ArrowLeft className="w-6 h-6 text-indigo-600" />;
    case 'right':
      return <ArrowRight className="w-6 h-6 text-indigo-600" />;
    case 'down':
      return <ArrowDown className="w-6 h-6 text-indigo-600" />;
    default:
      return null;
  }
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({ moves }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [moves]);

  const handleUndo = () => {
    dispatch(undoLastMove());
  };

  return (
    <div className="absolute top-4 right-4 max-w-md">
      <div className="flex flex-col space-y-2">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto p-2 bg-white/80 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent"
          style={{
            scrollBehavior: 'smooth',
            msOverflowStyle: 'none',
            scrollbarWidth: 'thin'
          }}
        >
          {moves.map((move, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow flex items-center justify-center"
            >
              {getArrowIcon(move)}
            </div>
          ))}
        </div>
        {moves.length > 0 && (
          <button
            onClick={handleUndo}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white transition-all duration-300"
          >
            <Undo className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-600 font-medium">Undo Last Move</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedOptions;
