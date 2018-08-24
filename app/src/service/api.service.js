import config from './config';

class API {
    
    headersJSON = {
        'Content-Type': 'application/json'
    };

    resolveIfSucccess(res){
        if (res.status >= 200 && res.status < 300) {
            return Promise.resolve(res.json())
        } else {
            return Promise.reject(res.json())
        }
    }

    requestJSON(method, url, body){
        return fetch(this.makeUrl(url), {
            method: method,
            headers: this.headersJSON,
            body: JSON.stringify(body)
        }).then(this.resolveIfSucccess);
    }

    makeUrl(url){
        return `${config.api}${url}`;
    }

    get(url){
        return fetch(this.makeUrl(url)).then(res => res.json());
    }

    post(url, data){
        return this.requestJSON('POST', url, data);
    }

    put(url, data){
        return this.requestJSON('POST', url, data);
    }

    uploadFile(url, method, field, file){
        const data = new FormData();
        data.append(field, file);

        return fetch(this.makeUrl(url), {
            method: method,
            body: data
        }).then(this.resolveIfSucccess);
    }
}

export default API; 