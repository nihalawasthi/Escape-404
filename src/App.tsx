import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LandingPage from "./components/LandingPage";
import GameComponent from "./components/GameComponent";
import CompletionPage from "./components/CompletionPage";
import Leaderboard from "./components/Leaderboard";
import LostGamePage from "./components/LostGamePage";
import LoginPage from "./components/LoginPage";
import { authService } from "./appwrite/auth";

const loginUser = async (email: string, password: string) => {
  try {
    const user = await authService.loginUser(email, password);
    const preferences = user.prefs || {};
    return { 
      user: {
        ...user,
        name: user.name || 'Anonymous Team'  // Provide a fallback name
      }, 
      preferences: {
        ...preferences,
        image: preferences.image || ''  // Provide a fallback image
      }
    };
  } catch (error) {
    throw new Error("Failed to login");
  }
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage loginUser={loginUser} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/game" element={<GameComponent />} />
          <Route path="/completion" element={<CompletionPage />} />
          <Route path="/lost-game" element={<LostGamePage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
