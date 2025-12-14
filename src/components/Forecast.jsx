
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

export default function Forecast({ forecast }) {
  if (!forecast) {
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
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-center mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day) => (
          <div key={day.dt} className="text-center">
            <p className="font-bold">
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={getWeatherIcon(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="mx-auto"
            />
            <p>{Math.round(day.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}