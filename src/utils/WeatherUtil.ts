import axios from 'axios';
export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching weather:', err);
  }
};
