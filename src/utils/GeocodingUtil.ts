import axios from 'axios';

export const getLocationInfo = async (location: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        formattedAddress: result.formatted,
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
      };
    } else {
      throw new Error('No results found');
    }
  } catch (err) {
    console.error('Error fetching location info:', err);
    return null;
  }
};

export const getTimeZone = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${process.env.OPENCAGE_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { timezone } = response.data.results[0].annotations;
      return timezone.name;
    } else {
      throw new Error('Timezone not found');
    }
  } catch (err) {
    console.error('Error fetching timezone:', err);
    return null;
  }
};
