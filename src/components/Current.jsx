import { WiDaySunny, WiStrongWind, WiHumidity } from "react-icons/wi";
import { PiDropBold } from "react-icons/pi";

const Current = ({ weather }) => {
  if (!weather) return null;

  const rainVolume =
    weather.rain && weather.rain["1h"] ? weather.rain["1h"] : 0;
  const chanceOfRain = rainVolume > 0 ? "Yes" : "0%";
  const hasRain = rainVolume > 0;

  const weatherMain = weather.weather[0].main.toLowerCase();

  let WeatherIcon = "/images/sun.png";
  if (weatherMain.includes("cloud")) {
    WeatherIcon = "/images/cloud2.png";
  } else if (weatherMain.includes("rain")) {
    WeatherIcon = "/images/rain2.png";
  } else if (weatherMain.includes("snow")) {
    WeatherIcon = "/images/snow2.png";
  } else if (weatherMain.includes("fog") || weatherMain.includes("mist")) {
    WeatherIcon = "/images/mist.png";
  }

  const { main, wind } = weather;
  const windKmh = Math.round(wind.speed * 3.6);

  return (
    <>
          <div className="text-[#E0E7F3] relative left-5 top-5 max-h-70 p-6 rounded-2xl flex flex-col justify-between gap-2 w-full max-w-lg mx-auto">
            <h2 className="text-4xl font-bold">{weather.name}</h2>
            {hasRain ? (
              <p className="text-sm text-[#E0E7F3]/50">
                Rain volume (last hour): {rainVolume} mm
              </p>
            ) : (
              <p className="text-sm text-[#E0E7F3]/50">
                No rain reported in the last hour
              </p>
            )}

            <h1 className="text-6xl mt-8 font-bold">
              {Math.round(weather.main.temp)}°
            </h1>

            <div className="flex flex-row-reverse relative bottom-45">
              <img src={WeatherIcon} alt={weatherMain} className="w-45 h-45" />
            </div>
          </div>

          <div className="w-180 h-80 max-w-lg mx-auto rounded-2xl px-6 py-4 mt-0">
            {/* Title */}
            <h3 className="text-lg text-gray-400 font-bold mb-4 flex flex-2">
              AIR CONDITIONS
            </h3>

            {/* Grid of weather details */}
            <div className="grid grid-cols-2 gap-6">
              {/* Real Feel */}
              <div className="flex flex-col items-center bg-[#E0E7F3]/35 rounded-[35px] p-4 shadow-md">
                <WiDaySunny className="text-4xl text-yellow-400 mb-2" />
                <span className="text-[#E0E7F3] text-sm">Real Feel</span>
                <span className="text-2xl font-bold">
                  {Math.round(weather.main.feels_like)}°
                </span>
              </div>

              {/* Wind */}
              <div className="flex flex-col items-center bg-[#E0E7F3]/35 rounded-[35px] p-4 shadow-md">
                <WiStrongWind className="text-4xl text-blue-400 mb-2" />
                <span className="text-[#E0E7F3] text-sm">Wind</span>
                <span className="text-2xl font-bold">{windKmh} km/h</span>
              </div>

              {/* Chance of Rain */}
              <div className="flex flex-col items-center bg-[#E0E7F3]/35 rounded-[35px] p-4 shadow-md">
                <PiDropBold className="text-2xl text-cyan-400 mb-2" />
                <span className="text-[#E0E7F3] text-sm">Chance of Rain</span>
                <span className="text-2xl mt-2 font-bold">{chanceOfRain}</span>
              </div>

              {/* Humidity */}
              <div className="flex flex-col items-center bg-[#E0E7F3]/35 rounded-[35px] p-4 shadow-md">
                <WiHumidity className="text-4xl text-indigo-300 mb-2" />
                <span className="text-[#E0E7F3] text-sm">Humidity</span>
                <span className="text-2xl font-bold">{main.humidity}%</span>
              </div>
            </div>
          </div>
    </>
  );
};

export default Current;
