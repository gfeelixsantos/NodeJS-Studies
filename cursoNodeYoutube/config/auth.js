const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Modelo de usuario
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

module.exports = function authUsuario(passport){
    passport.use( new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'

        }, async (email, senha, done) => {
            const buscaUsuario = await Usuario.findOne({ email: email})

            if (!buscaUsuario){ return done(null, false, {message: 'Esta conta não existe!'})}

            bcrypt.compare(senha, buscaUsuario.senha, (err, success) => {
                if (success){ done(null, buscaUsuario)}
                else { done(null, false, { message: 'Senha incorreta, tente novamente'})}

                if (err){ return console.log(err)}
            })
        }
    ))

    passport.serializeUser( (usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser( async(id, done) => {
        const buscaUsuario = await Usuario.findById({_id: id })
        done(null, buscaUsuario)
    })
}


