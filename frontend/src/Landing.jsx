"use client";
import React, { useState } from 'react'
import { Boxes } from "./components/ui/background-boxes";
import mrIncredile from "./assets/mrIncredible.png";
import finding from "./assets/finding.png";
import final from "./assets/final.png";
import { FaGithub } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import axios from 'axios';


const Landing = () => {

    const [username, setUsername] = useState("");
    const [baseImg, setBaseImg] = useState(mrIncredile);
    const [showTextArea, setShowTextArea] = useState(true);
    const [textarea, setTextarea] = useState("Enter Your GitHub Username");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!username.trim()) return;
        
        try{
            setBaseImg(finding);
            setShowTextArea(false);
            setTextarea("Let me laugh first...");
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${apiUrl}/troll/${username}`);
            if(!response.data.roast){
                console.log("No roast received");
                setBaseImg(mrIncredile);
                setTextarea("Something went wrong. Try again!");
                setShowTextArea(true);
                return;
            }

            setBaseImg(final);
            setTextarea(response.data.roast);
            
        }
        catch(error){
            console.error("Error fetching roast:", error);
            setBaseImg(mrIncredile);
            setTextarea(error.response?.status === 404 ? "User not found!" : "Something went wrong. Try again!");
            setShowTextArea(true);
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSubmit(e);
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
        <Boxes />
      <nav className="relative z-30 flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src={mrIncredile} 
            alt="Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 shadow-lg" 
          />
          <h1 className="font-mono text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
            Mr. Incredible
          </h1>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </a>
      </nav>

      <main className="font-mono container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 flex items-center justify-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)]">
        <div className="text-center w-full max-w-[95%] sm:max-w-xl md:max-w-2xl bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-slate-200">
            <div className="mb-6 sm:mb-8">
                <img 
                  src={baseImg} 
                  alt="Mr. Incredible" 
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full object-cover ring-4 ring-blue-500/30 shadow-xl mb-4 sm:mb-6"
                />
                <h1 className={`${baseImg === final ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-3xl"} font-bold text-slate-800 mb-2 px-2 break-words`}>
                  {textarea}
                </h1>
            </div>
          
          {showTextArea && 
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
              <input 
                type="text" 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base sm:text-lg"
                required
                aria-label="GitHub username"
              />
              <button 
                type="submit"
                disabled={!username.trim()}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-black hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                aria-label="Submit"
              >
                <LuSend className="w-4 h-4" />
                <span className="sm:hidden">Send</span>
              </button>
            </form>
          }
          
          {!showTextArea && (
            <button 
              onClick={() => {
                setShowTextArea(true);
                setBaseImg(mrIncredile);
                setTextarea("Enter Your GitHub Username");
                setUsername("");
              }}
              className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Try Another
            </button>
          )}
        </div>
      </main>
    </div>
    
  );
};

export default Landing;
