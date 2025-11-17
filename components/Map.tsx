import { chechnyaBounds, chrPolygon, placesGeoJSON } from '@/constants/map';
import MapboxGL, { FillExtrusionLayer, UserLocation } from '@rnmapbox/maps';
import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from './Icon';

MapboxGL.setAccessToken('pk.eyJ1IjoiaW5uemFyZSIsImEiOiJjbGVsZ3JoeTkwdmF1NDNrNWllcGJjZnZ4In0.hWnC4uPSl78gYHYnGvAurQ');

export default function App({ ...restProps }) {
  const center = [45.6889, 43.312]; // [lng, lat]
  const cameraRef = useRef<any>(null);
  const [coords, setCoords] = useState<number[]>(center);

  useEffect(() => {
    // Запрос разрешения для Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }
    };
    requestPermissions();
  }, []);

  const goToMyLocation = async () => {
    console.log('coords', coords);

    // cameraRef.current?.flyTo(coords, 1000);
    cameraRef.current?.setCamera({
      centerCoordinate: coords,
      zoomLevel: 14,
      animationMode: 'flyTo', // делает плавную анимацию, как flyTo
      animationDuration: 1500
    });
  };

  return (
    <View style={styles.page} {...restProps}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/mapbox/streets-v12"
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={true}
        >
          <MapboxGL.Images
            images={{
              'marker-icon': require('@/assets/images/marker.png')
            }}
          />

          <MapboxGL.ShapeSource
            id="places"
            shape={placesGeoJSON}
            onPress={(e) => {
              const feature = e.features[0];
              console.log('Нажали на:', feature.properties.name);
            }}
          >
            <MapboxGL.SymbolLayer
              id="places-icons"
              style={{
                iconImage: 'marker-icon', // название иконки
                iconSize: 0.12,
                iconAllowOverlap: true,
                textField: ['get', 'name'],
                textOffset: [0, 1.5],
                textSize: 12
              }}
            />
          </MapboxGL.ShapeSource>

          <MapboxGL.ShapeSource id="chechnya-border" shape={chrPolygon}>
            <MapboxGL.LineLayer
              id="chechnya-line"
              style={{
                lineWidth: 3,
                lineColor: 'green'
              }}
              maxZoomLevel={10}
            />

            <MapboxGL.FillLayer
              id="chechnya-fill"
              style={{
                fillColor: 'rgba(255,0,0,0.1)',
                fillOutlineColor: 'green'
              }}
              maxZoomLevel={10}
            />
          </MapboxGL.ShapeSource>

          <UserLocation
            visible={true}
            showsUserHeadingIndicator={true}
            onUpdate={(location: any) => {
              setCoords([location.coords.longitude, location.coords.latitude]);
            }}
          />

          <MapboxGL.Camera
            defaultSettings={{
              centerCoordinate: center,
              zoomLevel: 12,
              pitch: 0,
              heading: 0
            }}
            ref={cameraRef}
            zoomLevel={12}
            centerCoordinate={center}
            maxBounds={chechnyaBounds}
            animationMode="flyTo"
          />

          <FillExtrusionLayer
            id="3d-buildings"
            sourceLayerID="building"
            sourceID="composite"
            minZoomLevel={15}
            maxZoomLevel={22}
            style={{
              fillExtrusionColor: '#d9d9ce',
              fillExtrusionHeight: ['interpolate', ['linear'], ['zoom'], 10, 0, 10.05, ['get', 'height']],
              fillExtrusionBase: ['get', 'min_height'],
              fillExtrusionOpacity: 1
            }}
          />
        </MapboxGL.MapView>

        <TouchableOpacity style={styles.myLocationButton} onPress={goToMyLocation}>
          <Icon name="locate" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {
    position: 'relative',
    flex: 1
  },
  map: {
    flex: 1,
    height: 300
  },
  myLocationButton: {
    position: 'absolute',
    top: 150,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 8,
    elevation: 4,
    zIndex: 100
  }
});
