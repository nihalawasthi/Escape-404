import React, { useCallback, useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { sendscore } from "../appwrite/auth";

const CompletionPage = () => {
  const navigate = useNavigate();
  const teamName = localStorage.getItem('currentTeam') || 'Team';
  const pointsScored = localStorage.getItem('pointsScored') || '0';
  const [scoreSaved, setScoreSaved] = useState(false);

  const formatTime = (seconds: string) => {
    let totalSeconds = parseInt(seconds);
    const isNegative = totalSeconds < 0;
    totalSeconds = Math.abs(totalSeconds);
    
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    
    return `${isNegative ? '-' : ''}${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const completionTime = formatTime(localStorage.getItem('completionTime') || '0');
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const saveScore = async () => {
      try {
       {/* const existingScores = await getscore();
        console.log("Fetched Scores in saveScore:", existingScores); // Debugging line
    
        if (existingScores.total > 0) {
          const docId = existingScores.documents[0].$id;
          await database.updateDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            docId,
            { Score: completionTime, Points: pointsScored }
          );
        } else {
          await sendscore(completionTime, teamName, pointsScored);
        */} 
        await sendscore(completionTime, teamName, pointsScored);
        setScoreSaved(true);
      } catch (error) {
        console.error("Error saving or updating score:", error);
      }
    };
    
    

    if (!scoreSaved) {
      saveScore();
    }
  }, [scoreSaved, teamName, completionTime, pointsScored]);

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
          <Trophy className="w-20 h-20 text-yellow-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Congratulations on your escape!
        </h1>
        <div className="space-y-4 mb-8">
          <p className="text-xl text-gray-300">
            {teamName}
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-white">
              Final Time: {completionTime}
            </p>
            <p className="text-lg text-gray-300">
              Points Scored: {pointsScored}
            </p>
            <p className="text-sm text-gray-400 italic mt-2">
              {parseInt(completionTime) < 0 ? 
                "Exceptional performance! Your high score resulted in a negative time!" : 
                "Great job completing the escape!"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/leaderboard')}
          className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300"
        >
          LeaderBoard
        </button>
      </div>

      <footer className="absolute bottom-4 w-full text-center text-white">
        <p>2025 © All rights reserved by Eureka Club</p>
      </footer>
      
    </div>
  );
};

export default CompletionPage;
