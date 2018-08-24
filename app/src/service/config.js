const config = {
    development: {
        api: 'http://localhost:1337'
    },
    staging: {
        api: 'http://localhost:1337'
    },
    production: {
        api: 'http://localhost:1337'
    }
};

/**
 * GetEnv
 * 
 * @description return the enviroment based on the url of app
 */
function getEnv(){
    if(window.location.host.match('localhost')){
        return config['development'];
    } else if (window.location.host.match('stg')){
        return config['staging'];
    } else {
        return config['production'];
    }
    
}

export default getEnv();