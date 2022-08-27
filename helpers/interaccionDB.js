const fs = require('fs');
const ubicacionArchivo = './db/data.json';

const guardarDB = ( data ) => {
    const ubicacionArchivo = './db/data.json';
    fs.writeFileSync( ubicacionArchivo, JSON.stringify(data) );
}

const leerDB = () => {
    if( !fs.existsSync(ubicacionArchivo) ) return null;

    const info = fs.readFileSync( ubicacionArchivo, { encoding: 'utf-8' } );
    const data = JSON.parse( info )
    return data;
}

module.exports = {
    guardarDB,
    leerDB,
}