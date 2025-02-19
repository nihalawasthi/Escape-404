import React, { useState } from 'react';
import { Coding_Task } from '../data/coding_tasks';

interface CodingTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (isCorrect: boolean) => void;
  question: Coding_Task;
  onGiveUp: () => void; // Add this prop
}

const CodingTaskModal: React.FC<CodingTaskModalProps> = ({ isOpen, onClose, onSubmit, question, onGiveUp }) => {
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

  // Format the question text to preserve code block formatting with language-specific indentation
  const formatQuestion = (text: string) => {
    const parts = text.split('```');
    
    // Helper function to detect programming language from question text
    const detectLanguage = (text: string) => {
      if (text.includes('(C++)')) return 'cpp';
      if (text.includes('(Python)')) return 'python';
      if (text.includes('(Java)')) return 'java';
      return 'plaintext';
    };

    // Helper function to format code according to language
    const formatCode = (code: string, language: string) => {
      const lines = code.split('\n');
      const trimmedLines = lines.map(line => line.trimLeft());
      
      // Apply language-specific formatting
      switch (language) {
        case 'python':
          // Python uses 4 spaces for indentation
          return trimmedLines
            .map(line => {
              const indentLevel = (line.match(/^\s*/)[0] || '').length / 2;
              return '    '.repeat(indentLevel) + line.trimLeft();
            })
            .join('\n');
        
        case 'cpp':
        case 'java':
          // C++ and Java typically use 2 or 4 spaces
          return trimmedLines
            .map(line => {
              const indentLevel = (line.match(/^\s*/)[0] || '').length / 2;
              return '  '.repeat(indentLevel) + line.trimLeft();
            })
            .join('\n');
            
        default:
          return code;
      }
    };

    const language = detectLanguage(text);

    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is a code block
        const formattedCode = formatCode(part.trim(), language);
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md my-2 overflow-x-auto">
            <code className={`text-sm font-mono whitespace-pre language-${language}`}>
              {formattedCode}
            </code>
          </pre>
        );
      }
      // Handle regular text, split by newlines
      return part.split('\n').map((line, lineIndex) => (
        <p key={`${index}-${lineIndex}`} className="mb-2">
          {line}
        </p>
      ));
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full m-4">
        <div className="max-h-[70vh] overflow-y-auto">
          <div className="prose">
            <h2 className="text-xl font-bold mb-4">Coding Question</h2>
            {question.imageUrl && (
              <div className="mb-4">
                <img src={question.imageUrl} alt="Question related" className="w-full h-auto rounded-md" />
              </div>
            )}
            <div className="question-content mb-6">
              {formatQuestion(question.question)}
            </div>
          </div>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !hasSubmitted && setSelectedAnswer(index)}
                disabled={hasSubmitted}
                className={`w-full p-3 rounded-lg text-left transition-colors font-mono text-sm whitespace-pre ${
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

export default CodingTaskModal;