import React, { useState, useEffect } from "react";

function WeatherInfo({ weatherData }) {
  const [city, setCity] = useState("");
  const apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  const apiKeyforecast = "1fd8093fa5ff12d796d7de756cc9d6b9";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        // You can use the setWeatherData function passed as a prop instead of declaring local state
        weatherData.setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyforecast}`
        );

        if (!response.ok) {
          throw new Error("Forecast data not found");
        }

        const data = await response.json();
        // Use the setWeatherData function passed as a prop
        weatherData.setWeatherData((prevData) => ({
          ...prevData,
          forecast: data.list,
        }));
      } catch (error) {
        console.error("Error fetching forecast data:", error.message);
      }
    };

    if (city) {
      fetchWeatherData();
      fetchForecastData();
    }
  }, [city, apiKey, apiKeyforecast, weatherData]);

  const getWeekday = (index) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getDay();
    return days[(currentDayIndex + index) % days.length];
  };

  return (
    <div className="Weather">
      {/* Your existing JSX code here */}
    </div>
  );
}

export default WeatherInfo;
