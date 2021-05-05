const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares 
        // cors = permite proteger nuestro servidor de una manera superficial
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    /* Cuando se crea un middleware y publicamos la ruta publica esta tomara la ruta "/" (principal la del index) 
    dejando de lado el contenido que tenia "/" que era el Hello Word, para solucionar eso se le da otra ruta 
    "/api" con esto si nos nostraria el "Hello Word" */

    middlewares() {

        //cors
        this.app.use(cors());

        //Parse y lectura del body
        this.app.use(express.json());

        //Directorio publicos se diferencia un middleware cuando se usa el "use"
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor esta corriendo el puerto', this.port);
        })
    }
}

module.exports = Server;