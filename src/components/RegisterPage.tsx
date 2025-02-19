import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface PlayerInput {
  name: string;
}

interface TeamData {
  teamName: string;
  players: PlayerInput[];
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<TeamData>({
    teamName: '',
    players: Array(4).fill({ name: '' }),
    email: '',
    password: '',
  });

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...formData.players];
    newPlayers[index] = { name: value };
    setFormData({ ...formData, players: newPlayers });
  };

  const isFormValid = () => {
    const filledPlayers = formData.players.filter(p => p.name.trim() !== '');
    return (
      formData.teamName.trim() !== '' &&
      filledPlayers.length >= 2 &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    // Save team data to localStorage for demo
    localStorage.setItem('teamData', JSON.stringify(formData));
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8">Team Registration</h2>

          {/* Team Name */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-white/20">
              <label className="block text-white text-lg font-semibold mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full bg-black/50 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="Enter team name"
              />
            </div>
          </div>

          {/* Players */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {formData.players.map((player, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-white font-medium">
                  Player {index + 1} {index < 2 && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 outline-none"
                  placeholder="Enter player name"
                />
              </div>
            ))}
          </div>

          {/* Email and Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-white font-medium">
                Team Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="Enter team email"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white font-medium">
                Team Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 outline-none"
                placeholder="Enter team password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save and Start Game
          </button>

          {/* Minimum Players Note */}
          <div className="mt-4 flex items-center text-yellow-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>Minimum 2 players required</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Registration</h3>
            <p className="text-gray-300 mb-6">
              Please confirm that all the information provided is correct. You won't be able to change it later.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;