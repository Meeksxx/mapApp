import { useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, {
    Callout,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from 'react-native-maps';
import { markers } from './assets/markers';

// INITIAL REGION: OU campus
const INITIAL_REGION: Region = {
  latitude: 35.2059,
  longitude: -97.4457,
  latitudeDelta: 0.7,
  longitudeDelta: 0.7,
};


export default function App() {
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();

 
  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const focusMap = () => {
    // focus back on OU
    mapRef.current?.animateToRegion(INITIAL_REGION);
  };

  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  };

  const onRegionChange = (region: Region) => {
    console.log('Region changed:', region);
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({});
