import { Sun } from "lucide-react";

const Header = () => {
  return (
    <header
      className="flex items-center justify-between 
                 hover:shadow-blue-500/20 transition-all duration-300"
    >
      {/* 🌤️ Logo + Title */}
      <div className="flex items-center gap-3">
        {/* Animated Icon Glow */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 
                          rounded-full blur-md opacity-75 animate-pulse"></div>
          <div className="relative w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 
                          rounded-full flex items-center justify-center shadow-inner">
            <Sun className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        </div>

        {/* App Title */}
        <div className="flex flex-col">
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Weather<span className="text-blue-400">Now</span>
          </h1>
          <p className="text-gray-400 text-sm -mt-0.5">
            Your personal live weather dashboard
          </p>
        </div>
      </div>

      {/* 🌗 Optional Theme/Unit Toggle Placeholder */}
      <div className="flex items-center gap-3">
        {/* Example placeholder for theme toggle or date/time */}
        <p className="text-gray-400 text-sm hidden sm:block">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "short",
          })}
        </p>
      </div>
    </header>
  );
};

export default Header;
