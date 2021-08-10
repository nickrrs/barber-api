
module.exports = {  // Como no arquivo .sequelizerc definimos o path para o arquivo database.js dentro de config, tudo que precisa se preocupar é em setar as configurações de acesso aqui.
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'barber_db',
    define: {
        timestamps: true,  // garante campos timestamp para cada tabela no banco (ex: created_at, updated_at)
        underscored: true, // permite a criação de colunas com underscored (ex: table_one)
        underscoreAll: true,
    }
};
