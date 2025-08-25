import { useEffect, useState } from "react";
import axios from "axios";
import { Wind, Droplets, ThermometerSun, CloudRain } from "lucide-react";

const Live = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const apiKey = "15196f03ea381e83194fa2a5b9d7460b";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            const res = await axios.get(url);
            setWeather(res.data);
          } catch (err) {
            setError("Failed to fetch live weather");
          }
        },
        () => setError("Location access denied")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return (
    <div className="w-180 mx-auto mt-6 p-6 rounded-2xl bg-[#202B3E] shadow-lg">
      {error && <p className="text-red-400">{error}</p>}
      {weather ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section - Main Weather */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
            <p className="text-gray-400 text-sm capitalize">
              {weather.weather[0].description}
            </p>
            <h1 className="text-5xl font-extrabold text-[#E0E7F3] mt-2">
              {Math.round(weather.main.temp)}°
            </h1>
          </div>

          {/* Right Section - Air Conditions */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-[#33435E] rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-md">
              <ThermometerSun className="mb-2" size={28} />
              <span className="text-gray-400 text-sm">Real Feel</span>
              <p className="text-xl font-bold">
                {Math.round(weather.main.feels_like)}°
              </p>
            </div>
            <div className="bg-[#33435E] rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-md">
              <Wind className="mb-2" size={28} />
              <span className="text-gray-400 text-sm">Wind</span>
              <p className="text-xl font-bold">
                {Math.round(weather.wind.speed)} km/h
              </p>
            </div>
            <div className="bg-[#33435E] rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-md">
              <CloudRain className="mb-2" size={28} />
              <span className="text-gray-400 text-sm">Chance of Rain</span>
              <p className="text-xl font-bold">
                {weather.rain ? `${weather.rain["1h"]}%` : "0%"}
              </p>
            </div>
            <div className="bg-[#33435E] rounded-xl p-4 flex flex-col items-center justify-center text-white shadow-md">
              <Droplets className="mb-2" size={28} />
              <span className="text-gray-400 text-sm">Humidity</span>
              <p className="text-xl font-bold">{weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      ) : !error ? (
        <p className="text-gray-400 text-center">Fetching your location...</p>
      ) : null}
      <p className="text-gray-400 text-md mt-4">*Based on your live location</p>
    </div>
  );
};

export default Live;
