import React from "react";
import WeatherIcon from "./WeatherIcon";
import { weatherCodeMap } from "../../../api/weatherCode";
import { Wind } from "lucide-react";
import PropTypes from "prop-types";
/**
 * Displays the main weather card for the selected city.
 * @param {{ weather: { success: boolean, data: object }, selectedCity: object }} props
 */
const MainWeatherCard = ({ weather, selectedCity }) => {
  if (!weather?.data || !selectedCity) {
    return (
      <div className="text-center text-gray-300 py-10">
        🌍 Please search for a city to view the weather.
      </div>
    );
  }

  const weatherData = weather?.data;
  const { current_weather, current_weather_units } = weatherData;

  const cityName = selectedCity?.name || "Unknown Location";
  const timezone = selectedCity?.timezone 

  const {
    temperature = "--",
    windspeed = "--",
    weathercode,
    time,
    winddirection = "--",
  } = current_weather || {};

  const unit = current_weather_units?.temperature || "°C";

  // 🕓 Format time nicely
  const formattedTime = time
    ? new Date(time).toLocaleString(undefined, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  // ☁️ Map weather code to description + icon
  const weatherInfo = weatherCodeMap[weathercode] || "unknown";

  // 🎨 Dynamic background gradient based on temperature
  const bgGradient =
    temperature > 30
      ? "from-yellow-500 to-orange-600"
      : temperature > 20
      ? "from-blue-600 to-purple-700"
      : "from-blue-800 to-gray-900";

  return (
    <div
      className={`max-w-3xl mx-auto relative rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl bg-gradient-to-br ${bgGradient} transition-all duration-500`}
    >
      {/* ✨ Decorative animated stars */}
      <div className="absolute top-6 right-10 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
      <div className="absolute top-16 right-24 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
      <div className="absolute bottom-12 left-24 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-pulse delay-500"></div>

      {/* 🌤️ Main Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* 🏙️ City Info */}
        <div className="flex flex-col text-left">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-1 drop-shadow-sm">
            {cityName}
          </h2>
          {timezone && (
            <p className="text-blue-200 text-sm sm:text-base mb-1">
              {timezone}
            </p>
          )}
          
          <p className="text-blue-100 text-xs sm:text-sm">{formattedTime}</p>
        </div>

        {/* 🌡️ Weather Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 text-center sm:text-right">
          <WeatherIcon type={weatherInfo} size="w-20 h-20 sm:w-24 sm:h-24" />
          <div>
            <p className="text-white text-6xl sm:text-7xl font-light drop-shadow-lg">
              {temperature}
              <span className="text-blue-200 text-2xl font-normal ml-1">
                {unit}
              </span>
            </p>
            <p className="text-blue-100 text-base capitalize mt-1">
              {weatherInfo}
            </p>
            
          </div>
        </div>
      </div>

      {/* 🌬️ Wind Details Section */}
      <div className="mt-6 bg-gray-900/40 backdrop-blur-md rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-3 border border-gray-700/50 shadow-lg">
        <p className="text-blue-300 text-sm sm:text-base font-medium">
          Wind Direction:{" "}
          <span className="text-white font-semibold">
            {winddirection} {current_weather_units?.winddirection}
          </span>
        </p>
        <p className="text-white text-lg sm:text-xl font-semibold flex items-center gap-2">
          <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
          {windspeed} {current_weather_units?.windspeed}
        </p>
      </div>
    </div>
  );
};

MainWeatherCard.propTypes = {
  weather: PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.shape({
      current_weather: PropTypes.shape({
        temperature: PropTypes.number,
        windspeed: PropTypes.number,
        winddirection: PropTypes.number,
        weathercode: PropTypes.number,
        time: PropTypes.string,
      }),
      current_weather_units: PropTypes.shape({
        temperature: PropTypes.string,
        windspeed: PropTypes.string,
        winddirection: PropTypes.string,
      }),
    }),
  }),
  selectedCity: PropTypes.shape({
    name: PropTypes.string,
    timezone: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default MainWeatherCard;
