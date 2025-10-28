import { Cloud, CloudRain, Sun, Wind, Zap, Snowflake } from "lucide-react";

const WeatherIcon = ({ type, size = "w-12 h-12" }) => {
  const icons = {
    sunny: <Sun className={`${size} text-yellow-400`} />,
    cloudy: <Cloud className={`${size} text-gray-300`} />,
    'partly-cloudy': (
      <div className="relative">
        <Sun className={`${size} text-yellow-400`} />
        <Cloud className="absolute -bottom-1 -right-1 w-6 h-6 text-gray-300" />
      </div>
    ),
    rainy: <CloudRain className={`${size} text-blue-400`} />,
    'rainy-snow': (
      <div className="relative">
        <CloudRain className={`${size} text-blue-400`} />
        <Snowflake className="absolute -bottom-1 -right-1 w-6 h-6 text-white" />
      </div>
    ),
    snowy: <Snowflake className={`${size} text-white`} />,
    windy: <Wind className={`${size} text-gray-400`} />,
    thunderstorm: <Zap className={`${size} text-yellow-400`} />,
    'cloudy-fog': (
      <div className="relative">
        <Cloud className={`${size} text-gray-400`} />
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gray-200 opacity-50 rounded-full"></div>
      </div>
    ),
  };

  return icons[type] || icons.sunny;
};

export default WeatherIcon;
