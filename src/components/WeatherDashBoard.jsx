import React, { useCallback, useRef, useState} from "react";
import Header from "./common/Header";
import SearchBar from "./common/SearchBar";
import MainWeatherCard from "./common/Cards/MainWeatherCard";
import { fetchWeather } from "../api/FetchWeather";
import { fetchCoordinates } from "../api/FetchCoordinates";
import { AlertTriangle } from "lucide-react";

const WeatherDashboard = () => {
  // 🔹 State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("celsius");

 const debounceRef = useRef;

  /** 
   * ✅ Fetch weather data from Open Meteo API
   */
  const getWeather = useCallback(
    async (latitude, longitude, unit = selectedUnit) => {
      if (!latitude || !longitude) return;

      try {
        setLoading(true);
        setError("");

        const data = await fetchWeather(latitude, longitude, unit);
        if (data.success) {
          setWeather(data);
        } else {
          setWeather(null);
          setError(data.error);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [selectedUnit]
  );

  /**
   * ✅ Debounced user input for city suggestions
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      setError("");
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchCoordinates(value);
        if (data.success) {
          setSuggestions(data.data);
          setError("");
        } else {
          setSuggestions([]);
          setError(data.error);
        }
      } catch (err) {
        console.error("Coordinate fetch error:", err);
        setError("An unexpected error occurred.");
      }
    }, 800); // Slightly faster debounce
  };

  /**
   * ✅ Handles selecting a city
   */
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchTerm(`${city.name}, ${city.country || city.country_code}`);
    setSuggestions([]);
    getWeather(city.latitude, city.longitude);
  };

  /**
   * ✅ Manual search button handler
   */
  const handleSearch = () => {
    if (!selectedCity?.latitude || !selectedCity?.longitude) {
      setError("Enter valid city");
      return;
    }
    getWeather(selectedCity.latitude, selectedCity.longitude);
  };

  /**
   * ✅ Handles unit change
   */
  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    if (selectedCity?.latitude && selectedCity?.longitude) {
      getWeather(selectedCity.latitude, selectedCity.longitude, unit);
    }
  };

  /**
   * 🧩 Renders weather section
   */
  const renderWeatherSection = () => {
  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Animated gradient circle */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-spin-slow blur-sm opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-900 rounded-full border-4 border-t-blue-400 animate-spin"></div>
        </div>
      </div>

      {/* Loading text with shimmer */}
      <h2 className="text-lg sm:text-xl text-blue-200 font-semibold tracking-wide animate-pulse mb-2">
        Fetching latest weather data...
      </h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-xs animate-fade-in">
        Please wait a moment while we retrieve live weather updates.
      </p>
    </div>
  );
}


  if (weather?.success) {
    return <MainWeatherCard weather={weather} selectedCity={selectedCity} />;
  }

  if (error) {
    return (
      <div className="flex justify-center mt-6 px-4">
        <div className="relative w-full max-w-md bg-red-900/40 border border-red-700/60 rounded-xl p-5 
                        text-center text-red-300 shadow-lg backdrop-blur-md animate-fade-in overflow-hidden">
          {/* Glowing red border effect */}
          <div className="absolute inset-0 border border-red-500/30 rounded-xl blur-sm"></div>

          {/* Icon + Text */}
          <div className="relative flex flex-col items-center justify-center gap-3 z-10">
            <div className="bg-red-700/30 p-3 rounded-full border border-red-500/50 shadow-inner animate-pulse">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-sm sm:text-base font-medium leading-relaxed px-2">
              {error || "Something went wrong. Please try again later."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl 
                 transition-all duration-500 hover:shadow-cyan-500/20"
    >
      {/* Animated Emoji or Icon */}
      <div className="text-5xl mb-4 animate-bounce">🌍</div>

      {/* Main Message */}
      <h2 className="text-gray-100 text-xl sm:text-2xl font-semibold mb-2">
        Search for a City
      </h2>

      {/* Sub Message */}
      <p className="text-gray-400 text-sm sm:text-base max-w-md">
        Enter a city name above to view current weather conditions and forecasts.
      </p>
    </div>
  );
};


  // 🔹 JSX Layout
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 overflow-hidden">
  {/* 🌀 Subtle moving background gradient glow layers */}
  <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-blue-700/20 blur-3xl rounded-full animate-pulse"></div>
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700/20 blur-3xl rounded-full animate-pulse"></div>

  {/* 🌤️ Page Content */}
  <div className="relative z-10 flex flex-col items-center justify-start p-6 sm:p-8 md:p-12 space-y-8">
    <div className="w-full max-w-6xl space-y-8">
      {/* 🔆 Header */}
      <Header />

      {/* 🌈 Glass Panel Wrapper */}
      <div className="w-full max-w-5xl mx-auto p-6 sm:p-8 space-y-6 
                      transition-all duration-300 hover:shadow-blue-500/20">
        
        {/* 🔍 Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={handleInputChange}
          suggestions={suggestions}
          onSelectCity={handleSelectCity}
          onSearch={handleSearch}
          onUnitChange={handleUnitChange}
        />

        {/* ☁️ Weather Section */}
        <div className="pt-4">{renderWeatherSection()}</div>
      </div>
    </div>
  </div>
</div>

    
  );
};

export default WeatherDashboard;
