"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import logo from "../public/logo.png"
import "../effects/inputAnimations.css"
import "../effects/swingingLight.css"
import "../effects/flicker.css"

const LoginPage = () => {
  const [teamName, setTeamName] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (teamName.trim()) {
      localStorage.setItem("currentTeam", teamName)
      toast.success("Team name set successfully")
      setTeamName("")
      navigate("/landing")
    } else {
      toast.error("Please enter a team name")
    }
  }

  return (
    <div className="login-container flex justify-center items-center h-screen relative overflow-hidden">
      <div className="light-effect absolute top-[-15vh] left-[50%] transform -translate-x-1/2 swinging-light w-0 h-0 border-l-[60vw] border-l-transparent border-r-[60vw] border-r-transparent border-b-[130vh] border-b-white"></div>

      <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-300 w-1/2 h-4/5 flex flex-col justify-center z-10">
        <div className="flex justify-center mb-6">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-98 h-48" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Enter Team Name</h2>
        <form onSubmit={handleSubmit} className="flex flex-col px-12">
          <div className="mb-6">
            <label className="block text-lg font-medium text-white">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none input-animated"
              placeholder="Enter your team name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold text-lg"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage