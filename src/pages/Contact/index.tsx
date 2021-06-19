import React from 'react';
import { Button, TextStyle, View } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import timeZonedbService from '../../services/timezonedb';
import InputTextField from '../../components/InputTextField';
import { Contact } from '../../models/contact';

export default function ContactPage() {

    const [ name, setName ] = React.useState<string>();
    const [ phone, setPhone ] = React.useState<string>();
    const [ timeZone, setTimeZone ] = React.useState<string>();

    timeZonedbService.get('').then(({ data }: any) => {
        console.log(data.zones);
    });

    function handleSave() {

        if (name === undefined || name.trim() === '') {
            alert('Nome é obrigatório');
            return;
        }

        if (phone === undefined || phone.trim() === '') {
            alert('Telefone é obrigatório');
            return;
        }

        if (timeZone === undefined || timeZone.trim() === '') {
            alert('Fuso Horário é obrigatório!');
            return;
        }

        const contact: Contact = {
            name, 
            phone, 
            timeZone
        };

        console.log(contact);
    }

    return (
        <View>
            <InputTextField label='Nome' onChange={setName} />
           
            <InputTextField label='Telefone' onChange={setPhone} />

            <PickerSelect 
                style={{ 
                    viewContainer: { marginBottom: 20, }, 
                    inputAndroid: bothStyle, 
                    inputIOS: bothStyle, 
                    inputWeb: bothStyle 
                }}
                placeholder={{ label: "Fuso Horário" }}
                items={[
                    { label: '-03:00', value: -3 },
                    { label: '00:00', value: 0 },
                    { label: '+06:00', value: 6 },
                ]}
                onValueChange={
                    (value: any) => value && setTimezone(value.toString())
                }
            />
        
            <Button title='Salvar' onPress={handleSave} />
        </View>
    );
}

const bothStyle: TextStyle = {
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 30,
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    height: 50,
}