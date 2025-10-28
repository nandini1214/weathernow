import React, { useCallback, useRef, useState} from "react";
import Header from "./common/Header";
import SearchBar from "./common/SearchBar";
import MainWeatherCard from "./common/Cards/MainWeatherCard";
import { fetchWeather } from "../api/FetchWeather";
import { fetchCoordinates } from "../api/FetchCoordinates";
import { AlertTriangle, Wind } from "lucide-react";

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
      setError("Please select a valid city before searching.");
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
        <div className="text-center text-gray-300 py-10 text-lg animate-pulse">
          Fetching latest weather data...
        </div>
      );
    }

    if (weather?.success) {
      return (
        
          <MainWeatherCard weather={weather} selectedCity={selectedCity} />

          
        
      );
    }

    if (error) {
      return (
        <div className="text-red-400 mt-4 bg-red-900/30 p-3 rounded-lg border border-red-700">
          <AlertTriangle/> {error}
        </div>
      );
    }

    return (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl 
                   
                  transition-all duration-500 hover:shadow-cyan-500/20">
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
