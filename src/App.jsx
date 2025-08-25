import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

import News from "./components/News";
import Sidebar from "./components/Sidebar";
import Live from "./components/Live"
import Search from "./components/Search";
import Current from "./components/Current";

// Placeholder pages for routing
const Cities = () => <h2 className="text-gray-300 text-2xl">🌆 Cities Page</h2>;
const MapPage = () => <h2 className="text-gray-300 text-2xl">🗺️ Map Page</h2>;
const Settings = () => (
  <h2 className="text-gray-300 text-2xl">⚙️ Settings Page</h2>
);

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetching openweather API using axios
  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const apiKey = "15196f03ea381e83194fa2a5b9d7460b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const res = await axios.get(url);
      setWeather(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found");
      } else {
        setError("Failed to fetch weather");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#0B121E] text-white flex">
      {/* Sidebar is always visible */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Current />} />
          {/* Weather Page */}
          <Route
            path="/current"
            element={
              <>
                <Search onSearch={fetchWeather} />
                <div className="mt-6 space-y-6">
                  {loading && <p className="mt-4 text-gray-700">Loading...</p>}
                  {error && <p className="mt-4 text-red-500">{error}</p>}

                  {!weather ? <Live /> : <Current weather={weather} />}
                </div>
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/cities" element={<Cities />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Current />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
