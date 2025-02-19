import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { authService } from '../appwrite/auth'; // Import the authService

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void; // Add the onLogout prop
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await authService.logoutUser();
      localStorage.removeItem('currentTeam');
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Confirm Logout</h3>
          <p className="text-gray-300 mb-6">
            Are you sure you want to logout? Your current game progress will be saved.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onLogout} // Call the onLogout prop when the button is clicked
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;