import timeZonedbService from '../../services/timezonedb';
import contactRepository from "../../repositories/contact.repository";
import { Contact } from "../../models/contact";
import { TimeZone } from "../../models/timeZone";
import { formatGmt } from "../../utils";

export async function fetchTimeZones(){
    const { data } = await timeZonedbService.get('');

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

    return list;
}

export function formatTimeZoneList(distinctTimeZones: TimeZone[]) {
    return distinctTimeZones.map(zone => ({ 
        key: zone.gmtOffset,
        label: formatGmt(zone.gmtOffset),
        value: zone.gmtOffset
    }))
}

export async function save(name: string | undefined, phone: string | undefined, timeZone: TimeZone | undefined) {
    const contact = { name, phone, timeZone } as Contact;

    if (contact.name === undefined || contact.name.trim() === '') {
        alert('Nome é obrigatório');
        return;
    }

    if (contact.phone === undefined || contact.phone.trim() === '') {
        alert('Telefone é obrigatório');
        return;
    }

    if (contact.timeZone === undefined) {
        alert('Fuso Horário é obrigatório!');
        return;
    }

    await contactRepository.save(contact);
}