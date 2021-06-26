import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { BorderlessButton as Button } from 'react-native-gesture-handler';
import * as geoLocation from 'expo-location';
import moment from 'moment';
import 'moment/locale/pt-br';

import ContactRow from '../../components/ContactRow';
import { Contact } from '../../models/contact';
import storage from '../../repositories/contact.repository';

import contactRepository from '../../repositories/contact.repository';
import styles from './styles';

export default function HomePage() {

    const navigation = useNavigation();

    const [textLocation, setTextLocation] = React.useState('Carregando a localização...');
    const [contacts, setContacts] = React.useState<Contact[]>();

    const date = new Date();

    React.useEffect(() => {

        loadLocation();

        navigation.setOptions({
            headerLeft: () => (
                <Button style={styles.titleButton} onPress={goCamera}>
                    <Ionicons name="camera" size={26} />
                </Button>
            ),
            headerRight: () => (
                <Button style={styles.titleButton} onPress={goCreateContact}>
                    <Ionicons name="add-circle" size={26} />
                </Button>
            )
        });

    }, []);

    storage.list().then(contacts => setContacts(contacts));

    async function loadLocation() {
        const { status } = await geoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setTextLocation('A Permissão para Localização foi negada!');
            return;
        }

        const { coords } = await geoLocation.getCurrentPositionAsync();
        const [{ city, region, country }] = await geoLocation.reverseGeocodeAsync(coords);
        // Por algum motivo, `city` acima, está vindo nulo
        setTextLocation(`${city}, ${region}, ${country}`);
    }

    function goCamera() {
        navigation.navigate('Câmera');
    }

    function goCreateContact() {
        navigation.navigate('Editar Contato');
    }

    function goEditContact(contact: Contact) {
        navigation.navigate('Editar Contato', { contact });
    }

    function handleDelete(contact: Contact) {
        contactRepository.delete(contact.name);
    }

    function goMap() {
        navigation.navigate('Mapa');
    }

    const dateMoment = moment(date);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{textLocation}</Text>

            <Text style={styles.subtitle}>
                {dateMoment.format('dddd HH[h]mm, DD [de] MMMM [de] YYYY')}
            </Text>

            <FlatList
                data={contacts}
                style={styles.list}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <ContactRow contact={item} onPressRow={goEditContact} onDeleteRow={handleDelete} />
                )}
            />

            <Button onPress={goMap}>
                <Text>Ver no Mapa</Text>
            </Button>

        </View>
    );

}