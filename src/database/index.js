// Using sucrase to implements this syntax..
import Sequelize from 'sequelize';
// Using sucrase to implements this syntax..
//Same as const = require('..config/database)
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];

class Database {
    constructor(){
        this.init();
    }

    init(){
        //Instancia uma variavel do Sequelize com as configurações do banco.
        this.connection = new Sequelize(databaseConfig);
        //Percorre a array contendo todos os Models e chamando o método Init de cada uma delas.
        //Dentro do método init, ele aguarda uma variável contendo a conexão com o banco..
        //Neste caso, é a variável this.connection.
        models.map(model => model.init(this.connection));
    }
}

export default new Database();
