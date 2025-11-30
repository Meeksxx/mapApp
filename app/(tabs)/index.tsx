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

/**
 * INITIAL_REGION:
 * The map starts centered on the University of Oklahoma campus.
 * This satisfies the assignment requirement to initialize the map
 * at the OU campus location.
 */
const INITIAL_REGION: Region = {
  latitude: 35.2059,      // OU latitude
  longitude: -97.4457,    // OU longitude
  latitudeDelta: 0.7,     // Zoom level — wide enough to show nearby cities
  longitudeDelta: 0.7,
};

export default function App() {

  /**
   * mapRef:
   * A reference to the MapView component.
   * Allows access to map methods like animateToRegion().
   * Used by the Focus button to recenter the map on OU.
   */
  const mapRef = useRef<MapView | null>(null);

  /**
   * navigation:
   * Provided by Expo Router.
   * Used to configure the screen header (title + Focus button).
   */
  const navigation = useNavigation();

  /**
   * useEffect:
   * Runs when this screen mounts.
   * Configures:
   *  - The screen title ("Home")
   *  - The title alignment (centered)
   *  - The Focus button on the top LEFT of the header
   *    per the assignment instructions.
   */
  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerTitleAlign: 'center',
      headerLeft: () => (   // Focus button on LEFT
        <TouchableOpacity onPress={focusMap}>
          <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  /**
   * focusMap():
   * Called by the Focus button.
   * Smoothly animates the map back to the INITIAL_REGION (OU campus).
   */
  const focusMap = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION);
  };

  /**
   * onMarkerSelected():
   * Triggered when the user taps a marker.
   * Displays a simple alert showing the marker's name.
   */
  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  };

  /**
   * onRegionChange():
   * Called whenever the visible map area changes.
   * Useful for debugging orientation/zoom changes.
   */
  const onRegionChange = (region: Region) => {
    console.log('Region changed:', region);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 
        MapView Component:
        Displays the interactive map.
        - initialRegion starts at OU campus
        - showsUserLocation adds blue dot for the user
        - showsMyLocationButton adds the GPS recenter button
        - provider={PROVIDER_GOOGLE} uses Google Maps
      */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        {/* Render each marker from the markers array */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            {/* Callout bubble appears when a marker is tapped */}
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
