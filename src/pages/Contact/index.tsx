import React from 'react';
import { Alert, Button, Text, TextStyle, View } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import contactRepository from '../../repositories/contact.repository';
import timeZonedbService from '../../services/timezonedb';
import InputTextField from '../../components/InputTextField';
import { Contact } from '../../models/contact';
import { TimeZone } from '../../models/timezone'

export default function ContactPage() {

    const [ name, setName ] = React.useState<string>();
    const [ phone, setPhone ] = React.useState<string>();
    const [ timeZone, setTimeZone ] = React.useState<TimeZone>();
    const [ distinctTimeZones, setTimeZones ] = React.useState<TimeZone[]>();


    timeZonedbService.get('').then(({ data }: any) => {
        const zones: TimeZone[] = data.zones;

        const initial = new Map<Number, TimeZone>();

        // Abaixo, pegamos apenas os timezones distintos, dentre todos os timezones existentes, filtrando pelo
        // atributo 'gmtOffset'
        const map = zones.reduce((map, zone) => {
            map.set(zone.gmtOffset, zone);
            return map;
        }, initial);

        // Agora, do map filtrado anteriormente, geramos uma lista apenas com objetos do tipo TimeZone
        const list = Array.from(map.values());

        // Agora, ordenamos os timezones distintos, utilizando o atributo 'gmtOffset', do menor para o maior
        list.sort((a, b) => a.gmtOffset - b.gmtOffset);

        setTimeZones(list);
    });

    async function handleSave() {

        if (name === undefined || name.trim() === '') {
            alert('Nome é obrigatório');
            return;
        }

        if (phone === undefined || phone.trim() === '') {
            alert('Telefone é obrigatório');
            return;
        }

        if (timeZone === undefined) {
            alert('Fuso Horário é obrigatório!');
            return;
        }

        const contact: Contact = {
            name, 
            phone, 
            timeZone
        };

        const saved = await contactRepository.save(contact);

        if (saved) {
            Alert.alert('Salvo com sucesso');
        } else {
            Alert.alert('Nao foi possivel salvar, veriricar os dados');

        }
    }

    function formatGmt(gmtOffset: number) {
        let gmt = (gmtOffset / 3600).toFixed(2);
        if (!gmt.startsWith('-')) {
            gmt = `+${gmt}`;
        }

        const signal = gmt.substring(0, 1);
        let value = gmt.substring(1);
        if (value.length === 4) {
            value = `0${value}`;
        }

        const hour = value.split('.')[0];
        let minute = value.split('.')[1];
        minute = (60 * Number(`0.${minute}`)).toFixed(0);
        if (minute.length === 1) {
            minute = "0" + minute;
        } 

        return `GMT ${signal}${hour}:${minute}`;
    }

    if (!distinctTimeZones) {
        return <Text>Não foi possível obter a lista de Timezones</Text>
    } 

    return (
        <View>
            <InputTextField label='Nome' onChange={setName} />
           
            <InputTextField label='Telefone' onChange={setPhone} />

            <Text>Fuso Horário</Text>
            <PickerSelect 
                style={{ 
                    viewContainer: { marginBottom: 20, }, 
                    inputAndroid: bothStyle, 
                    inputIOS: bothStyle, 
                    inputWeb: bothStyle 
                }}
                placeholder={{ label: "Fuso Horário" }}
                value={timeZone ? timeZone.gmtOffset: null}
                items={
                    distinctTimeZones.map(zone => ({ 
                            key: zone.gmtOffset,
                            label: formatGmt(zone.gmtOffset),
                            value: zone.gmtOffset
                        }))
                }
                onValueChange={
                    value => setTimeZone(distinctTimeZones.find(tz => tz.gmtOffset === value))
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