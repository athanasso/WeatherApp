// MapScreen.tsx
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

interface MapScreenProps {
  route: MapScreenRouteProp;
}

export default function MapScreen({ route }: MapScreenProps) {
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Selected Location" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  map: {
    flex: 1,
  },
});
