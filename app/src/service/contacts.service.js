import queryString from 'query-string'
import API from './api.service';

class ContactService {
    constructor(){
        this.api = new API();
    }

    list(filter) {
        return this.api.get(`/contacts?${queryString.stringify(filter)}`);
    }

    create(data) {
        return this.api.post('/contacts', data);
    }

    read(id) {
        return this.api.get(`/contacts/${id}`);
    }

    uploadProfileImage(id, file) {
        return this.api.uploadFile(`/contacts/${id}/image`, 'PUT', 'image', file);
    }
}

export default ContactService;