import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import Error from "./components/Error";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import Searchbar from "./components/Searchbar";

import mountainBackground from './assets/mountain.jpg';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Phnom Penh"); // Default city

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5`;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch current weather
        const weatherUrl = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
          setWeather(weatherData);

          // Fetch 5-day forecast
          const forecastUrl = `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
          const forecastResponse = await fetch(forecastUrl);
          const forecastData = await forecastResponse.json();

          if (forecastResponse.ok) {
            // Filter to get one forecast per day
            const dailyForecasts = forecastData.list.filter((item, index) => {
              return index % 8 === 0;
            });
            setForecast(dailyForecasts);
          } else {
            setError(forecastData.message);
            setForecast(null); // Clear forecast on error
          }
        } else {
          setError(weatherData.message);
          setWeather(null); // Clear weather on error
          setForecast(null); // Clear forecast on error
        }
      } catch (error) {
        setError("Failed to fetch weather data.");
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${mountainBackground})` }}
    >
      <div className="bg-white/5 text-black rounded-lg shadow-lg p-8 max-w-lg w-full backdrop-blur-xl border border-black">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        <Searchbar onSearch={handleSearch} />
        {loading && <Loading />}
        {error && <Error error={error} />}
        {weather && <Display weather={weather} />}
        {forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}
