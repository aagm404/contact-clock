import timezonedbService from '../../services/timezonedb';
import contactRepository from "../../repositories/contact.repository";
import { Contact } from "../../models/contact";
import { Timezone } from "../../models/timezone";
import { formatGmt } from "../../utils";

export async function fetchTimezones(){
    const { data } = await timezonedbService.get('');

    const zones: Timezone[] = data.zones;

    const initial = new Map<Number, Timezone>();

    // Abaixo, pegamos apenas os timezones distintos, dentre todos os timezones existentes, filtrando pelo
    // atributo 'gmtOffset'
    const map = zones.reduce((map, zone) => {
        map.set(zone.gmtOffset, zone);
        return map;
    }, initial);

    // Agora, do map filtrado anteriormente, geramos uma lista apenas com objetos do tipo Timezone
    const list = Array.from(map.values());

    // Agora, ordenamos os timezones distintos, utilizando o atributo 'gmtOffset', do menor para o maior
    list.sort((a, b) => a.gmtOffset - b.gmtOffset);

    return list;
}

export function formatTimezoneList(distinctTimezones: Timezone[]) {
    return distinctTimezones.map(zone => ({ 
        key: zone.gmtOffset,
        label: formatGmt(zone.gmtOffset),
        value: zone.gmtOffset
    }))
}

export async function save(name: string | undefined, phone: string | undefined, timezone: Timezone | undefined) {
    const contact = { name, phone, timezone } as Contact;

    if (contact.name === undefined || contact.name.trim() === '') {
        alert('Nome é obrigatório');
        return;
    }

    if (contact.phone === undefined || contact.phone.trim() === '') {
        alert('Telefone é obrigatório');
        return;
    }

    if (contact.timezone === undefined) {
        alert('Fuso Horário é obrigatório!');
        return;
    }

    await contactRepository.save(contact);
}