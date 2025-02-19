import React, { useState, useEffect } from 'react';
import { Puzzle, Brain, Zap, Heart, Star, Shield, Crown, Trophy } from 'lucide-react';

interface Card {
  id: number;
  icon: React.ReactNode;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onComplete: (success: boolean) => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const icons = [
    <Puzzle className="w-8 h-8" />,
    <Brain className="w-8 h-8" />,
    <Zap className="w-8 h-8" />,
    <Heart className="w-8 h-8" />,
    <Star className="w-8 h-8" />,
    <Shield className="w-8 h-8" />,
    <Crown className="w-8 h-8" />,
    <Trophy className="w-8 h-8" />
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  // Add new effect to check moves count
  useEffect(() => {
    if (moves >= 15) {
      setIsLocked(true);
      setTimeout(() => {
        onComplete(false); // Fail the game when moves reach 15
      }, 1000);
    }
  }, [moves]);

  const initializeGame = () => {
    const duplicatedIcons = [...icons, ...icons];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setMoves(0);
    setFlippedCards([]);
  };

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched) return;
    if (flippedCards.includes(id)) return;
    if (moves >= 15) return; // Prevent clicks after move limit

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const newMoves = moves + 1;
      setMoves(newMoves);

      // Check for match
      setTimeout(() => {
        const [firstCard] = flippedCards;
        if (cards[firstCard].icon === cards[id].icon) {
          // Match found
          newCards[firstCard].isMatched = true;
          newCards[id].isMatched = true;
          setCards(newCards);

          // Check if game is complete
          const allMatched = newCards.every(card => card.isMatched);
          if (allMatched) {
            onComplete(true);
          }
        } else {
          // No match
          newCards[firstCard].isFlipped = false;
          newCards[id].isFlipped = false;
          setCards(newCards);
        }
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Memory Game</h3>
        <p className={`text-lg font-semibold ${moves >= 15 ? 'text-red-500' : 'text-gray-300'}`}>
          Moves: {moves}/15
        </p>
        {moves >= 15 && (
          <p className="text-red-500 text-sm mt-1">
            Too many moves! Game over.
          </p>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 rounded-lg transition-all duration-300 flex items-center justify-center
              ${card.isFlipped || card.isMatched 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600'}
              ${moves >= 15 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={card.isMatched || isLocked || moves >= 15}
          >
            {(card.isFlipped || card.isMatched) && card.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame; 