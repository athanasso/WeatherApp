import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { getPlaceSuggestions } from './src/utils/PlaceSuggestionUtil';
import { getLocationInfo, getTimeZone } from './src/utils/GeocodingUtil';
import { getWeather } from './src/utils/WeatherUtil';

export default function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [weatherInfo, setWeatherInfo] = useState<any>(null);
  const [timeZone, setTimeZone] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const results = await getPlaceSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSelectSuggestion = async (placeName: string) => {
    setQuery(placeName);
    setSuggestions([]);
    const locationData = await getLocationInfo(placeName);
    if (locationData) {
      setLocationInfo(locationData);
      const tz = await getTimeZone(locationData.latitude, locationData.longitude);
      setTimeZone(tz);
      const weatherData = await getWeather(locationData.latitude, locationData.longitude);
      setWeatherInfo(weatherData);
    }
  };

  const handleFetchInfo = async () => {
    const locationData = await getLocationInfo(query);
    if (locationData) {
      setLocationInfo(locationData);
      const tz = await getTimeZone(locationData.latitude, locationData.longitude);
      setTimeZone(tz);
      const weatherData = await getWeather(locationData.latitude, locationData.longitude);
      setWeatherInfo(weatherData);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={query}
        onChangeText={setQuery}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.placeName}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectSuggestion(item.placeName)}
            >
              <Text style={styles.suggestionItem}>{item.placeName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <Button title="Fetch Info" onPress={handleFetchInfo} />

      {locationInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Location: {locationInfo.formattedAddress}</Text>
          <Text style={styles.infoText}>Coordinates: {locationInfo.latitude}, {locationInfo.longitude}</Text>
          <Text style={styles.infoText}>Timezone: {timeZone}</Text>
          {weatherInfo && (
            <>
              <Text style={styles.infoText}>Weather: {weatherInfo.weather[0].description}</Text>
              <Text style={styles.infoText}>Temperature: {weatherInfo.main.temp}°C</Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
