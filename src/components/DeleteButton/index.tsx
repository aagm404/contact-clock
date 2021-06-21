import React from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { Contact } from "../../models/contact";

import styles from './styles';

interface Props {
    contact: Contact
    onPressDelete: (contact: Contact) => void;
}

export default function DeleteButton(props: Props) {
    const {contact, onPressDelete} = props;
    
    return (
        <View style={styles.deleteContainer}>
            <BorderlessButton onPress={() => onPressDelete(contact)}>
                <Ionicons name="trash" size={20} color='white' />
            </BorderlessButton>
        </View>
    )
}