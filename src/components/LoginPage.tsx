"use client"

import { useState } from "react"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import logo from "../public/logo.png"
import type { User } from "../appwrite/auth"
import "../effects/inputAnimations.css"
import "../effects/swingingLight.css"
import "../effects/flicker.css"

interface LoginProps {
  loginUser: (
    email: string,
    password: string,
  ) => Promise<{
    user: User
    preferences: Record<string, any>
  }>
}

const LoginPage: React.FC<LoginProps> = ({ loginUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { user, preferences } = await loginUser(email, password)
      localStorage.setItem("currentTeam", user.name)
      localStorage.setItem("userImage", preferences.image)
      toast.success("Logged in successfully")
      setEmail("")
      setPassword("")
      navigate("/landing")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      toast.error(errorMessage)
    }
  }

  return (
    <div className="login-container flex justify-center items-center h-screen relative overflow-hidden">
      {/* Light effect */}
      <div className="light-effect absolute top-[-15vh] left-[50%] transform -translate-x-1/2 swinging-light w-0 h-0 border-l-[60vw] border-l-transparent border-r-[60vw] border-r-transparent border-b-[130vh] border-b-white"></div>

      <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-300 w-1/2 h-4/5 flex flex-col justify-center z-10">
        <div className="flex justify-center mb-6">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="w-98 h-48" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col px-12">
          <div className="mb-6">
            <label className="block text-lg font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none input-animated"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg mt-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none input-animated"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage