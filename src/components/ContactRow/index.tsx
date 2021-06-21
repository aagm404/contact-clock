import React from "react";
import { Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import DeleteButton from "../DeleteButton";
import { formatGmt } from '../../utils';
import { Contact } from "../../models/contact";

import styles from "./styles";

interface Props {
    contact: Contact
    onPressRow: (contact: Contact) => void
    onDeleteRow: (contact: Contact) => void;
}

export default function ContactRow(props: Props) {
    const {contact, onPressRow, onDeleteRow} = props;

    return (
        <Swipeable renderRightActions={() => <DeleteButton contact={contact} onPressDelete={() => onDeleteRow(contact)} />}>
            <View style={styles.container} onTouchEnd={() => onPressRow(contact)} >
                <Text style={styles.text}>{contact.name}</Text>
                <Text style={styles.text}>{formatGmt(contact.timeZone.gmtOffset)}</Text>
            </View>
        </Swipeable>
    );
}