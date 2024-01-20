const Sequelize = require('sequelize')
const sequelize = new Sequelize('postapp', 'root', '123456', { host: 'localhost', dialect:'mysql' });

                    // Criando Model para que o Sequelize criar no banco de dados.
// const Postagens = sequelize.define('postagens', {
//     titulo: { type: Sequelize.STRING },
//     conteudo: { type: Sequelize.TEXT }
// })

                    // Criando Model para que o Sequelize criar no banco de dados.
// const Usuarios = sequelize.define('usuarios', {
//     nome: { type: Sequelize.STRING },
//     idade: { type: Sequelize.INTEGER },
//     email: { type: Sequelize.STRING }
// })

                    // Sincronizando Model com banco de dados.
// Usuarios.sync()   -- Esta comentado pois sempre que executar será recriado a tabela !


                    // Inserindo dados através do Sequelize para a tabela
// Postagens.create({
//     titulo: "Minha primeira postagem",
//     conteudo: "Inserindo dados através do Sequelize"
// })

// Usuarios.create({
//     nome: 'Gabriel Felix',
//     idade: 28,
//     email: 'felix.devx@gmail.com'
// })


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};