const mongoose = require('mongoose')

// Configuração para utilizar Mongoos
const mongoConnect = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/users')
    console.log('MongoDB Conectado!');
}
mongoConnect()

// Definindo modelo schema de usuario
const UserSchema = mongoose.Schema(
    {
        nome: { type: String },
        email: { type: String },
        idade: { type: Number }
    }
)

// Vinculando o model (schema)
mongoose.model('Users', UserSchema)

// Criando novo usuário
try {
    const newUser = mongoose.model('Users')
    new newUser(
        {
            nome: 'Marcos Souza',
            email: 'souzamx@gmail.com',
            idade: 35
        }
    ).save()
    
    console.log('Usuário criado com sucesso !', newUser);

} catch (error) {
    console.log('Falha ao criar usuário !', error);
}