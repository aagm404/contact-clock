import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
    },

    addButton: {
        marginRight: 10,
    },

    list: {
        width: Dimensions.get('window').width - 20
    },

});