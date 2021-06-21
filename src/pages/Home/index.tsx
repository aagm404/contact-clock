import React from "react";
import { FlatList, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { BorderlessButton as Button } from 'react-native-gesture-handler';

import ContactRow from "../../components/ContactRow";
import { Contact } from "../../models/contact";
import storage from '../../repositories/contact.repository';

import styles from './styles';
import contactRepository from '../../repositories/contact.repository';

export default function HomePage() {

    const navigation = useNavigation();
    
    React.useEffect(() => {
        
        navigation.setOptions({
            headerRight: () => (
                <Button style={styles.addButton} onPress={goCreateContact}>
                    <Ionicons name="add-circle" size={26} />
                </Button>
            )
        });
        
    }, []);

    const [ contacts, setContacts ] = React.useState<Contact[]>();
    storage.list().then(contacts => setContacts(contacts));


    function goCreateContact() {
        navigation.navigate('Editar Contato');
    }

    function goEditContact(contact: Contact) {
        navigation.navigate('Editar Contato', { contact });
    }

    function handleDelete(contact: Contact) {
        contactRepository.delete(contact.name);
    }

    return (
        <View style={styles.container}>

            <Text>São Paulo, Brazil</Text>

            <Text>Terça-feira 22:11, 08 de Junho de 2021</Text>

            <FlatList
                 data={contacts}
                 style={styles.list}
                 keyExtractor={item => item.name}
                 renderItem={({ item }) => (
                     <ContactRow contact={item} onPressRow={goEditContact} onDeleteRow={handleDelete} />
                 )}
            />

        </View>
    );
}