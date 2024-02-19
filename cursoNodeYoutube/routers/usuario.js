const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/cadastro', (req, res) => {
    res.render('./cadastro')

})

router.get('/login', (req, res) => {
    res.render('./usuario/login')
})

router.get('/logout', (req, res) => {
    req.logout( (err) => {
        if (err) return req.flash('error_msg', 'Erro ao sair')
        req.flash('success_msg', 'Deslogado com sucesso!')
        res.redirect('/')
    })

})

router.post('/cadastro', async(req, res) => {

    let errors = []
    const { nome, email, senha, confirmaSenha } = req.body

    // Validação manual dos dados do formulário
    nome == '' 
        ? errors.push({ texto: 'Por favor informe seu nome.'})   : false

    senha.length < 4
        ? errors.push({texto: 'A deve deve ser maior que 4 (quatro) caracteres'})   : false

    senha != confirmaSenha
        ? errors.push({texto: 'As senhas devem ser iguais.'})   : false

    if (errors.length > 0){

        res.render('./usuario/cadastro', { errors: errors })

    } 
    
    // Senão houver erros na validação, prossegue com o cadatro
    else {
        const buscaUsuario = await Usuario.find({ email: email })

        if (buscaUsuario.length > 0){

            req.flash('error_msg', 'Este e-mail já está sendo utilizando.')
            res.redirect('/usuario/cadastro')
        
        } 
        
        // Adicionando novo usuario ao banco
        else {

            const novoUsuario = new Usuario({
                nome: nome,
                email: email,
                senha: senha
            })

            // Criptografando senha
            await bcrypt.genSalt(10, (err, salt) => {

                bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                    if (err){
                        console.log(err);
                        req.flash('error_msg', 'Erro ao registrar o usuario')
                        res.redirect('./usuario/cadastro')
                    };

                    novoUsuario.senha = hash

                    try {
                        novoUsuario.save()
                        req.flash('success_msg', 'Usuário criado com sucesso!')
                        res.redirect('/')

                    } catch (error) {
                        console.log(error);
                        req.flash('error_msg', 'Erro ao registrar o usuario')
                        res.redirect('/')
                    }
                })
            })

        }
    }
        
    
})

router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
     })(req, res, next)
})


module.exports = router