/**
 * Fetches current weather data from the Open-Meteo API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {"celsius" | "fahrenheit"} unit - Temperature unit
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function fetchWeather(lat, lon, unit = "celsius") {
  // Validate parameters
  if (Number?.isNaN(lat) || Number?.isNaN(lon)) {
    return { success: false, error: "Invalid latitude or longitude." };
  }

  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=kmh`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Validate response
    if (!data.current_weather) {
      return { success: false, error: "No current weather data found." };
    }

    // Simplify structure for easier UI usage
    // const weather = {
    //   temperature: data.current_weather.temperature,
    //   windspeed: data.current_weather.windspeed,
    //   winddirection: data.current_weather.winddirection,
    //   weathercode: data.current_weather.weathercode,
    //   time: data.current_weather.time,
    //   unit: tempUnit,
    // };
    // console.log(weather)
    // return {success: true, data: data };
    return {success : true, data:data}
  } catch (err) {
    console.error("Error fetching weather:", err);
    return { success: false, error: "Failed to fetch weather. Please try again later." };
  }
}
