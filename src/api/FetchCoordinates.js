/**
 * Fetches geographical coordinates (latitude, longitude) for a given city name
 * using the Open-Meteo Geocoding API.
//  *

 */
export async function fetchCoordinates(name) {

  if (!name?.trim()) {
    return { success: false, error: "City name cannot be empty." };
  }

  const encodedName = encodeURIComponent(name.trim());
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedName}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);

    // Handle non-200 responses
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Handle cases where no results are found
    if (!data.results || data.results.length === 0) {
      return { success: false, error: `No results found for "${name}".` };
    }

    // Return only relevant data (optional)
    const simplifiedResults = data.results.map((item) => ({
      name: item.name,
      country: item.country,
      country_code: item.country_code,
      timezone: item.timezone,
      latitude: item.latitude,
      longitude: item.longitude,
    }));

    return { success: true, data: simplifiedResults };
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return { success: false, error: "Failed to fetch coordinates. Please try again." };
  }
}
