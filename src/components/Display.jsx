
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

export default function Display({ weather }) {
  if (!weather) {
    return null;
  }

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return null;
    const prefix = iconCode.substring(0, 2); // Get the numeric part, e.g., "01" from "01d"

    switch (prefix) {
      case "01":
        return clear_icon;
      case "02":
      case "03":
      case "04":
        return cloud_icon;
      case "09":
      case "10":
        return rain_icon;
      case "11": // Thunderstorm
        return rain_icon;
      case "13":
        return snow_icon;
      case "50": // Mist
        return drizzle_icon;
      default:
        return clear_icon; // Default to clear for unknown icons
    }
  };

  return (
    <div className="mt-8 text-center">
      <h2 className="text-4xl font-bold">{weather.name}</h2>
      <p className="text-lg">{weather.weather[0].main}</p>
      <img
        src={getWeatherIcon(weather.weather[0].icon)}
        alt={weather.weather[0].description}
        className="mx-auto my-4 w-24 h-24"
      />
      <p className="text-4xl font-bold mb-4">
        {Math.round(weather.main.temp)}°
      </p>
    </div>
  );
}