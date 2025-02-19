import React, { useCallback } from 'react';
import { XOctagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const LostGamePage = () => {
  const navigate = useNavigate();
  const teamName = localStorage.getItem('currentTeam') || 'Team';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
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
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full mx-4 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <XOctagon className="w-20 h-20 text-red-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Your journey has ended
        </h1>
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-300">
            {teamName}
          </p>
          <p className="text-lg text-white">
            Thank you for playing the game.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300"
        >
          Back to Home
        </button>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-white">
        <p>2025 © All rights reserved by Eureka Club</p>
      </footer>
      
    </div>
  );
};

export default LostGamePage;