import React from 'react';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import * as geoLocation from 'expo-location';
import { View } from 'react-native';

import styles from './styles'

export default function MapPage() {

    const [location, setLocation] = React.useState<Region>();

    async function loadPosition() {
        const { coords } = await geoLocation.getCurrentPositionAsync();
        console.log(coords);
        setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } as Region);
    }

    React.useEffect(() => {
        loadPosition();
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={location}>
                <Marker
                    key={1}
                    coordinate={{ ...location } as LatLng}
                    title="Minha Localização"
                    description="Qualquer coisa!"
                />
            </MapView>
        </View>
    );
}