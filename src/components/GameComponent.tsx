import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { RootState } from '../store/store';
import {
  movePlayer,
  reduceLives,
  addMove,
  setAvailableMoves,
  updateGameTime,
  resetGameTime,
  addPoints
} from '../store/gameSlice';
import { questions as originalQuestions } from '../data/questions';
import { tasks as originalTasks } from '../data/tasks';
import { questions as originalCodingTasks } from '../data/coding_tasks';
import { generateContent } from '../data/content';
import GameMap from './GameMap';
import GameOption from './GameOption';
import QuestionModal from './QuestionModal';
import ContentModal from './ContentModal';
import TaskModal from './TaskModal';
import CodingTaskModal from './CodingTaskModal';
import SelectedOptions from './SelectedOptions';
import LivesDisplay from './LivesDisplay';
import AlertModal from './AlertModal';
import WinModal from './WinModal';
import Timer from './Timer';
import GameOverModal from './GameOverModal';
import BackgroundImage from '../images/pixelcut-export (3).jpg'; // Import the custom background image
import Logo from '../images/Logo.jpg'; // Import the logo image
import '../effects/tech-background.css'; // Import the custom tech background CSS
import LogoutModal from './LogoutModal'; // Import the LogoutModal component
import { authService } from '../appwrite/auth'; // Import the authService

const GameComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    playerPosition, 
    lives, 
    moves, 
    blockedCells,
    hasWon,
    isGameOver,
    gameTime,
    points,
    livesLost
  } = useSelector((state: RootState) => state.game);
  
  const [showQuestion, setShowQuestion] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showCodingTask, setShowCodingTask] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedOptionType, setSelectedOptionType] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentCodingTaskIndex, setCurrentCodingTaskIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(originalQuestions);
  const [shuffledTasks, setShuffledTasks] = useState(originalTasks);
  const [shuffledCodingTasks, setShuffledCodingTasks] = useState(originalCodingTasks);
  const [timerStarted, setTimerStarted] = useState(false);
  const [taskStartTime, setTaskStartTime] = useState<number>(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the LogoutModal
  const [usedCodingTaskIndices, setUsedCodingTaskIndices] = useState<number[]>([]);
  const [usedQuestionIndices, setUsedQuestionIndices] = useState<number[]>([]);

  // Mapping each option to a direction (top, left, right, bottom)
  const [iconPositions, setIconPositions] = useState<{ [key: string]: string }>({
    question: 'top',
    puzzle: 'left',
    book: 'right',
    pencil: 'bottom'
  });

  const userImage = localStorage.getItem('userImage'); // Use Logo.jpg if no user image is found

  // Helper: Given a position, return movement delta and rotation.
  const getDeltaAndRotation = (pos: string) => {
    let dx = 0, dy = 0, rotation = 0;
    if (pos === 'top') {
      dy = -1;
      rotation = 0;
    } else if (pos === 'left') {
      dx = -1;
      rotation = 270;
    } else if (pos === 'right') {
      dx = 1;
      rotation = 90;
    } else if (pos === 'bottom') {
      dy = 1;
      rotation = 180;
    }
    return { dx, dy, rotation };
  };

  // Start timer when component mounts
  useEffect(() => {
    dispatch(resetGameTime());
    setTimerStarted(true);
    shuffleQuestions();
    shuffleTasks();
    shuffleCodingTasks();
  }, []);

  // Handle timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (timerStarted && !hasWon && !isGameOver) {
      timer = setInterval(() => {
        dispatch(updateGameTime(gameTime + 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerStarted, hasWon, isGameOver, gameTime]);

  // Update available moves whenever playerPosition, blockedCells, or iconPositions change.
  useEffect(() => {
    updateAvailableMoves();
  }, [playerPosition, blockedCells, iconPositions]);

  useEffect(() => {
    if (isGameOver) {
      setTimerStarted(false);
      setTimeout(() => navigate('/lost-game'), 2000);
    }
  }, [isGameOver]);

  useEffect(() => {
    if (hasWon) {
      setTimerStarted(false);
      const finalTime = gameTime - (points * 2) + (livesLost * 10);
      localStorage.setItem('completionTime', finalTime.toString());
      localStorage.setItem('pointsScored', points.toString());
      setTimeout(() => navigate('/completion'), 2000);
    }
  }, [hasWon]);

  // Validate move using the current iconPositions mapping
  const isValidMove = (type: string): boolean => {
    const { x, y } = playerPosition;
    const pos = iconPositions[type];
    const { dx, dy } = getDeltaAndRotation(pos);
    const newX = x + dx;
    const newY = y + dy;
    return (
      newX >= 0 && newX < 10 &&
      newY >= 0 && newY < 10 &&
      !blockedCells[newY][newX]
    );
  };

  // Update available moves based on dynamic directions.
  const updateAvailableMoves = () => {
    const available: string[] = [];
    const optionTypes = ['question', 'puzzle', 'book', 'pencil'];
    optionTypes.forEach((type) => {
      if (isValidMove(type)) available.push(type);
    });
    dispatch(setAvailableMoves(available));
  };

  const getCurrentContent = () => {
    return generateContent(
      selectedOptionType === 'puzzle' ? 'puzzle' : 'task',
      currentContentIndex
    );
  };

  const calculatePoints = (type: string, timeTaken: number) => {
    const basePoints = {
      question: 3,
      puzzle: 5,
      book: 2,
      pencil: 5
    };
    const timeThresholds = {
      question: 30,
      puzzle: 45,
      book: 75,
      pencil: 60
    };
    const basePoint = basePoints[type as keyof typeof basePoints] || 0;
    const threshold = timeThresholds[type as keyof typeof timeThresholds] || 30;
    let timeBonus = 0;
    if (timeTaken < threshold) {
      timeBonus = Math.floor((threshold - timeTaken) / 5);
    }
    return basePoint + timeBonus;
  };

  const getNextCodingTaskIndex = () => {
    const availableIndices = shuffledCodingTasks
      .map((_, index) => index)
      .filter(index => !usedCodingTaskIndices.includes(index));
    if (availableIndices.length === 0) {
      return null; // All tasks have been used
    }
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedCodingTaskIndices([...usedCodingTaskIndices, randomIndex]);
    return randomIndex;
  };

  const getNextQuestionIndex = () => {
    const availableIndices = shuffledQuestions
      .map((_, index) => index)
      .filter(index => !usedQuestionIndices.includes(index));
    if (availableIndices.length === 0) {
      return null; // All questions have been used
    }
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    setUsedQuestionIndices([...usedQuestionIndices, randomIndex]);
    return randomIndex;
  };

  const handleOptionClick = (type: string) => {
    if (!isValidMove(type)) {
      setAlertMessage('This path is blocked!');
      setShowAlert(true);
      return;
    }
    // Record the option type and start the task.
    setSelectedOptionType(type);
    setTaskStartTime(Date.now());
    if (type === 'question') {
      setShowQuestion(true);
    } else if (type === 'pencil') {
      setShowTask(true);
    } else if (type === 'book') {
      const nextIndex = getNextCodingTaskIndex();
      if (nextIndex !== null) {
        setCurrentCodingTaskIndex(nextIndex);
        setShowCodingTask(true);
      } else {
        setAlertMessage('No more coding tasks available!');
        setShowAlert(true);
      }
    } else {
      setShowContent(true);
    }
  };

  // Helper: Shuffle an array (Fisher–Yates shuffle)
  const shuffleArray = (array: any[]) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Shuffle questions array
  const shuffleQuestions = () => {
    setShuffledQuestions(shuffleArray(originalQuestions));
  };

  // Shuffle tasks array
  const shuffleTasks = () => {
    setShuffledTasks(shuffleArray(originalTasks));
  };

  // Shuffle coding tasks array
  const shuffleCodingTasks = () => {
    setShuffledCodingTasks(shuffleArray(originalCodingTasks));
  };

  // Shuffle iconPositions ensuring that options are remapped.
  const shuffleIconPositions = () => {
    const positions = ['top', 'left', 'right', 'bottom'];
    const keys = ['question', 'puzzle', 'book', 'pencil'];
    let newPermutation: string[];
    let attempts = 0;
    do {
      newPermutation = shuffleArray(positions);
      attempts++;
    } while (
      keys.some((key, index) => newPermutation[index] === iconPositions[key] && keys.length > 1) &&
      attempts < 10
    );
    const updatedMapping: { [key: string]: string } = {};
    keys.forEach((key, index) => {
      updatedMapping[key] = newPermutation[index];
    });
    setIconPositions(updatedMapping);
  };

  // Add this new helper function
  const getRandomIndex = (arrayLength: number) => {
    return Math.floor(Math.random() * arrayLength);
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    const timeTaken = Math.floor((Date.now() - taskStartTime) / 1000);
    const newPosition = { ...playerPosition };

    // Determine movement based on the current icon's position.
    const currentPos = iconPositions[selectedOptionType!];
    const { dx, dy, rotation } = getDeltaAndRotation(currentPos);
    newPosition.x += dx;
    newPosition.y += dy;
    newPosition.rotation = rotation;

    if (isCorrect && selectedOptionType) {
      const earnedPoints = calculatePoints(selectedOptionType, timeTaken);
      dispatch(addPoints(earnedPoints));

      // Update indices for questions or content.
      if (selectedOptionType === 'question') {
        setCurrentQuestionIndex(prev => prev + 1);
      } else if (selectedOptionType === 'pencil') {
        setCurrentTaskIndex(prev => prev + 1);
      } else if (selectedOptionType === 'book') {
        const nextIndex = getNextCodingTaskIndex();
        if (nextIndex !== null) {
          setCurrentCodingTaskIndex(nextIndex);
        } else {
          setAlertMessage('No more coding tasks available!');
          setShowAlert(true);
        }
      } else {
        setCurrentContentIndex(prev => prev + 1);
      }
    } else {
      dispatch(reduceLives());
      dispatch(updateGameTime(gameTime + 10)); // Add 10 seconds penalty
      setAlertMessage(`Wrong answer! You lost a life! +10 seconds penalty`);
      setShowAlert(true);

      // Instead of incrementing, randomly select new indices when answer is wrong
      if (selectedOptionType === 'question') {
        setCurrentQuestionIndex(getRandomIndex(shuffledQuestions.length));
      } else if (selectedOptionType === 'pencil') {
        setCurrentTaskIndex(getRandomIndex(shuffledTasks.length));
      } else if (selectedOptionType === 'book') {
        const nextIndex = getNextCodingTaskIndex();
        if (nextIndex !== null) {
          setCurrentCodingTaskIndex(nextIndex);
        } else {
          setAlertMessage('No more coding tasks available!');
          setShowAlert(true);
        }
      } else {
        setCurrentContentIndex(getRandomIndex(shuffledQuestions.length));
      }
    }

    dispatch(movePlayer(newPosition));

    // Determine arrow direction based on the icon's position.
    let arrowDirection = "";
    if (currentPos === "top") arrowDirection = "up";
    else if (currentPos === "left") arrowDirection = "left";
    else if (currentPos === "right") arrowDirection = "right";
    else if (currentPos === "bottom") arrowDirection = "down";

    // Add the arrow direction to the moves display in the top-right.
    dispatch(addMove(arrowDirection));

    setShowQuestion(false);
    setShowContent(false);
    setShowTask(false);
    setShowCodingTask(false);
    setSelectedOptionType(null);

    // Shuffle icon positions after each move.
    shuffleIconPositions();
  };

  const handleGiveUp = () => {
    dispatch(reduceLives());
    setAlertMessage(`You lost a life!!`);
    setShowAlert(true);
  
    const newPosition = { ...playerPosition };
    const currentPos = iconPositions[selectedOptionType!];
    const { dx, dy, rotation } = getDeltaAndRotation(currentPos);
    newPosition.x += dx;
    newPosition.y += dy;
    newPosition.rotation = rotation;

    // Ensure the question does not reappear
    if (selectedOptionType === 'question') {
      setUsedQuestionIndices([...usedQuestionIndices, currentQuestionIndex]);
      const nextIndex = getNextQuestionIndex();
      if (nextIndex !== null) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setAlertMessage('No more questions available!');
        setShowAlert(true);
      }
    }
  
    dispatch(movePlayer(newPosition));
  
    let arrowDirection = "";
    if (currentPos === "top") arrowDirection = "up";
    else if (currentPos === "left") arrowDirection = "left";
    else if (currentPos === "right") arrowDirection = "right";
    else if (currentPos === "bottom") arrowDirection = "down";
  
    dispatch(addMove(arrowDirection));
  
    setShowQuestion(false);
    setShowContent(false);
    setShowTask(false);
    setShowCodingTask(false);
    setSelectedOptionType(null);
  
    shuffleIconPositions();
  };

  const handleLogout = async () => {
    try {
      await authService.logoutUser();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // CSS classes for positioning the option icons.
  const positionClasses: { [key: string]: string } = {
    top: "absolute -top-48 left-1/2 -translate-x-1/2",
    left: "absolute top-1/2 -left-48 -translate-y-1/2",
    right: "absolute top-1/2 -right-48 -translate-y-1/2",
    bottom: "absolute -bottom-48 left-1/2 -translate-x-1/2"
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-tech-pattern" 
    >
      <div className="absolute top-4 left-4">
      <GameMap />
      </div>

      {/* Moves display in the top-right white box */}
      <SelectedOptions moves={moves} />

      <LivesDisplay lives={lives} />
      <Timer time={gameTime} />
      <button
        onClick={() => setShowLogoutModal(true)} // Open the LogoutModal on button click
        className="absolute bottom-4 left-4 mt-16 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout} // Pass the handleLogout function to the LogoutModal
      />

      <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        {/* Render option icons at their dynamically assigned positions */}
        {['question', 'puzzle', 'book', 'pencil'].map((optionKey) => {
        if (!isValidMove(optionKey)) return null;
        const pos = iconPositions[optionKey];
        return (
          <div key={optionKey} className={positionClasses[pos]}>
          <GameOption type={optionKey} onClick={() => handleOptionClick(optionKey)} />
          </div>
        );
        })}

        {/* Player image */}
        <div 
        className="w-24 h-24 rounded-full bg-white/90 shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/50"
        style={{ minWidth: '96px', minHeight: '96px' }}
        >
        {userImage ? (
          <img 
            src={userImage} 
            alt="Profile" 
            className="w-full h-full object-contain"
          />
        ) : (
          <img 
            src={Logo} 
            alt="Default Profile" 
            className="w-full h-full object-contain"
          />
        )}
        </div>
      </div>
      </div>

      {showQuestion && (
      <QuestionModal
        isOpen={showQuestion}
        onClose={() => setShowQuestion(false)}
        onSubmit={handleAnswerSubmit}
        question={shuffledQuestions[currentQuestionIndex % shuffledQuestions.length]}
        onGiveUp={handleGiveUp} // Pass handleGiveUp to QuestionModal
      />
      )}

      {showContent && selectedOptionType && selectedOptionType !== 'question' && (
      <ContentModal
        isOpen={showContent}
        onClose={() => setShowContent(false)}
        onSubmit={handleAnswerSubmit}
        content={getCurrentContent()}
      />
      )}

      {showTask && (
      <TaskModal
        isOpen={showTask}
        onClose={() => setShowTask(false)}
        onSubmit={handleAnswerSubmit}
        task={shuffledTasks[currentTaskIndex % shuffledTasks.length]}
        onGiveUp={handleGiveUp} // Pass handleGiveUp to TaskModal
      />
      )}

      {showCodingTask && (
      <CodingTaskModal
        isOpen={showCodingTask}
        onClose={() => setShowCodingTask(false)}
        onSubmit={handleAnswerSubmit}
        question={shuffledCodingTasks[currentCodingTaskIndex % shuffledCodingTasks.length]}
        onGiveUp={handleGiveUp} // Pass handleGiveUp to CodingTaskModal
      />
      )}

      <AlertModal
      isOpen={showAlert}
      message={alertMessage}
      onClose={() => setShowAlert(false)}
      />

      <WinModal isOpen={hasWon} />
      <GameOverModal isOpen={isGameOver} />

      <footer className="absolute bottom-4 w-full text-center text-white">
      <p>2025 © All rights reserved by Eureka Club</p>
      </footer>
    </div>
  );
};

export default GameComponent;