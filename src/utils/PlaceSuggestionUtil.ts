import axios from 'axios';

export const getPlaceSuggestions = async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${process.env.OPENCAGE_API_KEY}&limit=5`
    );

    return response.data.results.map((result: any) => ({
      placeName: result.formatted,
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
    }));
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    return [];
  }
};
