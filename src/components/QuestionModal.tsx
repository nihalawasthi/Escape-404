import React, { useState } from 'react';
import { Question } from '../data/questions';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (isCorrect: boolean) => void;
  question: Question;
  onGiveUp: () => void; // Add this prop
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, onSubmit, question, onGiveUp }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setHasSubmitted(true);
      setTimeout(() => {
        onSubmit(isCorrect);
        setSelectedAnswer(null);
        setHasSubmitted(false);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !hasSubmitted && setSelectedAnswer(index)}
              disabled={hasSubmitted}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                hasSubmitted
                  ? index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : selectedAnswer === index
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                  : selectedAnswer === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {hasSubmitted && (
          <div className={`mt-4 text-center font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onGiveUp}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Give Up
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null || hasSubmitted}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;