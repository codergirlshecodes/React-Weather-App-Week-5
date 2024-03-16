import React, { useState, useEffect } from "react";
import "./weatherforecast.css";

export default WeatherForecast = ({ weatherData, apiKeyforecast }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        if (!city) {
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        const data = await response.json();

        const forecast = data.list
          .filter((item, index) => index % 8 === 0)
          .map((item) => ({
            day: getWeekday(item.dt),
            maxTemperature: item.main.temp_max,
            minTemperature: item.main.temp_min,
            weatherCode: item.weather[0].id,
          }))
          .slice(0, 5);
        setForecastData(forecast);
      } catch (error) {
        console.error("Error fetching forecast data:", error.message);
      }
    };

    fetchForecastData();
  }, [city, apiKey]);

  const getWeekday = (timestamp) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  };

  const getWeatherEmoji = (weatherCode) => {
    switch (true) {
      case weatherCode >= 200 && weatherCode < 300:
        return "⚡️";
      case weatherCode >= 300 && weatherCode < 500:
        return "🌧️";
      case weatherCode >= 500 && weatherCode < 600:
        return "☔️";
      case weatherCode >= 600 && weatherCode < 700:
        return "❄️";
      case weatherCode >= 700 && weatherCode < 800:
        return "🌫️";
      case weatherCode === 800:
        return "☀️";
      case weatherCode === 801:
        return "🌤️";
      case weatherCode >= 802 && weatherCode < 900:
        return "☁️";
      default:
        return "❓";
    }
  };

  <div>
      {forecastData.map((dayForecast, index) => (
        <div key={index}>
          <p>{dayForecast.day}</p>
          <p>
            Max Temp: {dayForecast.maxTemperature}, Min Temp:{" "}
            {dayForecast.minTemperature}
          </p>
          <p>Weather: {getWeatherEmoji(dayForecast.weatherCode)}</p>
        </div>
      ))}
    </div>

  return (
    <div>
      {forecastData.map((dayForecast, index) => (
        <div key={index}>
          <p>{dayForecast.day}</p>
          <p>
            Max Temp: {dayForecast.maxTemperature}, Min Temp:{" "}
            {dayForecast.minTemperature}
          </p>
          <p>Weather: {getWeatherEmoji(dayForecast.weatherCode)}</p>
        </div>
      ))}
    </div>
  );
};