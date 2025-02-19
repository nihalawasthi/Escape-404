import { useEffect, useState } from "react";
import { getscore } from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";

interface LeaderboardEntry {
  Teamname: string;
  Score: string;
  Points: number;
  $id: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await getscore();
        setLeaderboard(
          response.documents.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.Points - a.Points) // Sort by highest points
        );
      } catch (error) {
        setError("Failed to load leaderboard");
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-black text-white">

      <div className="relative z-10 bg-gray-900/90 backdrop-blur-lg rounded-lg p-8 w-full max-w-4xl shadow-xl border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-400 tracking-wide">
            Leaderboard
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-gray-500 hover:bg-gray-400 text-black font-semibold rounded-lg transition-all duration-300 shadow-md"
          >
            Home
          </button>
        </div>

        {loading && (
          <div className="text-gray-400 text-center py-8 text-lg">Loading...</div>
        )}

        {error && (
          <div className="text-red-500 text-center py-8 text-lg">{error}</div>
        )}

        {!loading && !error && leaderboard.length === 0 && (
          <div className="text-gray-400 text-center py-8 text-lg">
            No scores available.
          </div>
        )}

        {!loading && !error && leaderboard.length > 0 && (
          <table className="w-full text-white text-lg border border-gray-700">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Team</th>
                <th className="p-4 text-left">Final Time</th>
                <th className="p-4 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr
                  key={entry.$id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } border-b border-gray-600`}
                >
                  <td className="p-4 font-bold text-gray-400">{index + 1}</td>
                  <td className="p-4 font-semibold text-gray-300">{entry.Teamname}</td>
                  <td className="p-4 text-gray-400 font-bold">{entry.Score}</td>
                  <td className="p-4 text-gray-400 font-bold">{entry.Points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;