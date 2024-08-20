import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Home: undefined;
  Map: { latitude: number; longitude: number };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;
