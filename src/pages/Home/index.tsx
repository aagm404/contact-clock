import React from "react";
import { Text, FlatList, View } from "react-native";
import { Contact } from "../../models/contact";
import storage from '../../repositories/contact.repository';

export default function HomePage() {

    const [ contacts, setContacts ] = React.useState<Contact[]>();

    storage.list().then(contacts => setContacts(contacts));

    return (
        <View style={{ marginTop: 50 }}>
            <FlatList
                data={contacts}
                renderItem={obj => (
                    <>
                        <Text>{obj.item.name}</Text>
                        <Text>{obj.item.phone}</Text>
                        <Text>{obj.item.timeZone.gmtOffset}</Text>
                    </>
                )}
            />
        </View>
    );
}