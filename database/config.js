const mongoose = require('mongoose');



const dbConecction = async() => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConecction
}