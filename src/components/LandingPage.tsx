import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import Logo from '../images/Logo.png';
import '../effects/typewriter.css'; // Import the typewriter CSS
import '../effects/pulse-glow.css'; // Import the pulse glow CSS
import '../effects/scrollbar.css'; // Import the custom scrollbar CSS
import '../effects/loading-bar.css'; // Import the loading bar CSS

const LandingPage = () => {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Loading bar animation */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 animate-loading-bar"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 animate-loading-bar-reverse"></div>
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="Eureka Club Logo" className="w-64 h-64 mb-4 pulse-glow" /> {/* Add pulse-glow class */}
        </div>
        
        <div className="mb-12 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-2">Eureka Club</h1>
          <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 typewriter-box">
            ESCAPE-404
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/game')}
            className="w-64 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500"
          >
            Start Game
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 text-lg bg-black/40 p-4 rounded-lg backdrop-blur-sm max-h-96 overflow-y-auto custom-scrollbar" style={{ width: '350px' }}>
        <h2 className="text-xl font-bold text-white mb-2">Instructions</h2>
        <p className="text-white">
          <strong>Gameplay:</strong>
          <br />At each point in the maze, you will be presented with four options:
          <br />1. Question: Answer a knowledge-based question.
          <br />2. Puzzle: Solve a memory game.
          <br />3. Coding Task: Complete a simple coding challenge (e.g., coding snippet).
          <br />4. Physical Task: Perform a small physical activity.
          <br />
          <br />
          <strong>Choosing Your Path:</strong>
          <br />• Selecting an option will lead you to the corresponding challenge.
          <br />• Successfully completing the challenge will move your team forward in the maze. The specific path you take depends on which option you choose.
          <br />• Failing a challenge will result in losing a life. If you lose all your lives, then the game would come to an end.
          <br />
          <br />  
          <strong>Scoring and Time:</strong>
          <br />• Your team's progress through the maze is tracked by time.
          <br />• Successful completion of challenges will earn you points, which can translate to time deductions.
          <br />• Unsuccessful attempts will result in deduction of lives.
          <br />• The team with the lowest calculated time wins. This is the actual time taken plus any time adjustments (deductions or additions) based on your points.
          <br />
          <br />
          <strong>Important Information - Refreshing the Page:</strong>
          <br />Do not refresh the webpage during the game! If you refresh the page, your progress will be lost, and you will have to start the game from the beginning. Re-attempts are not allowed. Please ensure a stable internet connection to avoid accidental refreshes.
          <br />
          <br />
          <strong>Winning the Game:</strong>
          <br />The team that reaches the end of the maze with the lowest calculated time will be declared the winner.
        </p>
      </div>

      <div className="absolute bottom-4 left-4 text-lg bg-black/40 p-4 rounded-lg backdrop-blur-sm">
        <ul className="text-white">
          <li className="font-semibold mb-2">Developers:</li>
          <li className="ml-4">
            <a href="https://github.com/nihalawasthi" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Nihal Awasthi
            </a>
          </li>
          <li className="ml-4">
            <a href="https://github.com/wurtz-codez" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Koustubh Pande
            </a>
          </li>
          <li className="ml-4">
            <a href="https://github.com/Asceptic07" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Swanik Srivastava
            </a>
          </li>
        </ul>
      </div>
      
      <footer className="absolute bottom-4 right-4 text-white p-4 rounded-lg backdrop-blur-sm">
        <p className="font-bold">2025 © All rights reserved by Eureka Club</p>
      </footer>

    </div>
  );
};

export default LandingPage;