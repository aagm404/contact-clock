import storage from '@react-native-async-storage/async-storage';
import { Contact } from '../models/contact';

class ContactRepository {

    private readonly document = '@contacts'
    private readonly repository = storage;

    public async list(): Promise<Contact[]> {
        let jsonArray = await this.repository.getItem(this.document);
        if (!jsonArray) {
            jsonArray = '[]';
        }

        return JSON.parse(jsonArray);
    }

    public async save(contact: Contact): Promise<boolean> {
        let list = await this.list();

        // Abaixo, removemos da lista ja' salva, um contato que ja tem o nome do contado que esta' sendo salvo, pois
        // definimos a regra de que ao se cadastrar um contato com um nome ja' existente, a aplicacao sobrescreve o 
        // contato novo em cima do contato antigo. Mantem o nome, mas altera-se o telefone e/ou o fuso horario        
        list = list.filter(c => c.name !== contact.name);
        
        list.push(contact);

        try {
            this.store(list);
            return true;
        } catch (error) {
            console.error('Erro ao salvar: ', error);
            return false;
        }
    }

    public async delete(contactName: string) {
        let list = await this.list();
        list = list.filter(c => c.name !== contactName);
        
        this.store(list);
    }

    private async store(list: Contact[]) {
        await this.repository.setItem(this.document, JSON.stringify(list));
    }
}

export default new ContactRepository();