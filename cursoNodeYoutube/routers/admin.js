const express = require('express')
const router = express.Router()

// Importando informações do banco para registrar na rota POST
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render('./admin/index')
})

router.get('/post', (req, res) => {
    res.send('Página de posts')
})

router.get('/categorias', (req, res) => {
    res.render('./admin/categorias')
})

router.get('/categorias/add', (req, res) => {
    res.render('./admin/categoriaadd')
})

router.post('/categorias/nova', (req, res) => {

    // Fazendo uma validação manualmente (Nome e Slug não pode ser vazios)
    let erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({ text: "Nome inválido" })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({ text: "Slug inválido" })
    }
    if (erros.length > 0){
        res.render('./admin/categoriaadd', { erros: erros })
    }
    //.................... Validação finalizada
    else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save()
            .then( () => {
                console.log('Categoria cadastrada !')
                req.flash('success_msg', 'Categoria registrada com sucesso !')
                res.redirect('/admin/categorias')
            })
            .catch( (error) => {
                req.flash('error_msg', 'Erro ao cadastrar categoria!')
                res.redirect('/admin')
            })

    }

})

module.exports = router