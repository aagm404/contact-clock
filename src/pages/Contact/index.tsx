import React from 'react';
import PickerSelect from 'react-native-picker-select';
import { Alert, Button, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InputTextField from '../../components/InputTextField';
import { Timezone } from '../../models/timezone'
import { fetchTimezones, formatTimezoneList, save } from './actions';

import styles from './styles';

export default function ContactPage() {

    const route = useRoute();
    const navigation = useNavigation();

    const [ name, setName ] = React.useState<string>();
    const [ phone, setPhone ] = React.useState<string>();
    const [ timezone, setTimezone ] = React.useState<Timezone>();
    const [ distinctTimezones, setTimezones ] = React.useState<Timezone[]>();

    React.useEffect(() => {

        fetchTimezones().then(list => setTimezones(list));
        
        if (route.params) {
            const { contact } = route.params as any;
            setName(contact.name);
            setPhone(contact.phone);
            setTimezone(contact.timezone);
        } else {
            navigation.setOptions({
                title: 'Novo Contato'
            });
        }

    }, []);

    async function handleSave() {
        try {
            save(name, phone, timezone);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Não foi possível salvar, verificar os dados!');
        }
    }

    if (!distinctTimezones) {
        return <Text>Carregando...</Text>
    } 

    return (
        <View style={styles.container}>
            <InputTextField label='Nome' value={name} onChange={setName} />
           
            <InputTextField label='Telefone' value={phone} onChange={setPhone} />

            <Text>Fuso Horário</Text>
            <PickerSelect 
                style={{ 
                    viewContainer: { marginBottom: 20, }, 
                    inputAndroid: styles.bothStyle, 
                    inputIOS: styles.bothStyle, 
                    inputWeb: styles.bothStyle 
                }}
                placeholder={{ label: "Fuso Horário" }}
                value={timezone ? timezone.gmtOffset: null}
                items={formatTimezoneList(distinctTimezones)                }
                onValueChange={
                    value => setTimezone(distinctTimezones.find(tz => tz.gmtOffset === value))
                }
            />
        
            <Button title='Salvar' onPress={handleSave} />
        </View>
    );
}