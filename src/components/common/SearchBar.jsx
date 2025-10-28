import React from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

/**
 * SearchBar Component
 * Allows user to search for a city, select units, and view suggestions.
 *
 * @param {object} props
 * @param {string} props.searchTerm - Current search input value
 * @param {function} props.onInputChange - Handler for typing input
 * @param {function} props.onSearch - Handler for manual search button
 * @param {array} props.suggestions - List of city suggestions
 * @param {function} props.onSelectCity - Handler when city is selected
 * @param {string} props.selectedUnit - Current temperature unit ("celsius" or "fahrenheit")
 * @param {function} props.onUnitChange - Handler for unit change
 */
const SearchBar = ({
  searchTerm,
  onInputChange,
  onSearch,
  suggestions = [],
  onSelectCity,
  selectedUnit,
  onUnitChange,
}) => {
  const handleUnitChange = (e) => onUnitChange(e.target.value);

  return (
    <div className="relative flex flex-col gap-4 max-w-xl mx-auto w-full">
  {/* 🔍 Input Row */}
  <div
    className="flex items-center w-full bg-gray-800/40 rounded-2xl backdrop-blur-xl 
               border border-gray-700/40 shadow-lg px-3 py-2 transition-all 
               hover:shadow-blue-500/20 focus-within:ring-2 focus-within:ring-blue-500"
  >
    {/* Search Icon */}
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text" 
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={onInputChange}
        className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-gray-500 rounded-lg 
                   focus:outline-none text-base sm:text-lg tracking-wide"
      />
    </div>

    {/* Search Button */}
    <button
      onClick={onSearch}
      className="ml-3 px-5 py-3 bg-gradient-to-r from-blue-900 to-indigo-500 text-white font-semibold 
                 rounded-xl shadow-md hover:shadow-cyan-400/30 hover:scale-105 
                 active:scale-95 transition-all duration-300"
    >
      Search
    </button>

    {/* 🌡️ Unit Selector */}
    <select
      value={selectedUnit}
      onChange={handleUnitChange}
      className="ml-3 px-4 py-3 bg-gray-800/60 text-white text-sm font-medium rounded-xl 
                 border border-gray-700/60 hover:bg-gray-700/70 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500 cursor-pointer transition"
    >
      <option value="celsius" >°C</option>
      <option value="fahrenheit">°F</option>
    </select>
  </div>

  {/* 🧭 Suggestions Dropdown */}
  {suggestions?.length > 0 && (
    <ul
      className="absolute top-full left-0 right-0 mt-2 bg-gray-900/80 backdrop-blur-xl border border-gray-700/40 
                 rounded-2xl shadow-2xl text-white max-h-72 overflow-y-auto z-30 animate-fadeIn"
    >
      {suggestions?.map((city, index) => (
        <li
          key={`${city?.name}-${city?.country_code}-${index}`}
          className="border-b border-gray-700/40 last:border-none"
        >
          <button
            type="button"
            onClick={() => onSelectCity(city)}
            className="w-full text-left px-5 py-3 flex flex-col hover:bg-gradient-to-r 
                       hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-200"
          >
            <span className="font-semibold text-blue-300 text-base">
              {city?.name}
            </span>
            <span className="text-gray-300 text-sm">
              {city?.country || city?.country_code}
            </span>
            <span className="text-gray-400 text-xs mt-0.5">
              🕒 {city?.timezone ?? "N/A"}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

/* ✅ Add PropTypes validation */
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      country_code: PropTypes.string,
      timezone: PropTypes.string,
    })
  ),
  onSelectCity: PropTypes.func.isRequired,
  selectedUnit: PropTypes.oneOf(["celsius", "fahrenheit"]).isRequired,
  onUnitChange: PropTypes.func.isRequired,
};

export default SearchBar;
