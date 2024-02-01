const express = require('express')
const router = express.Router()

// Importando informações do banco para registrar na rota POST
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.send('Index')
})

router.get('/postagens', (req, res) => {
    res.render('./admin/postagens')
})

router.get('/postagens/add', async(req, res) => {
    try {
        const listagemCategorias = await Categoria.find()
        res.render('./admin/postagensadd', { listagemCategorias: listagemCategorias.map( e => e.toJSON())})
    } catch (error) {
        req.flash('error_msg', 'Erro ao criar nova postagem')
        res.redirect('/admin/postagens')
    }
})

router.get('/categorias', async(req, res) => {
    const categorias = await Categoria.find().sort({nome: 'asc'})
    res.render('./admin/categorias', { categorias: categorias.map( categoria => categoria.toJSON())})
})

router.get('/categorias/add', (req, res) => {
    res.render('./admin/categoriaadd')
})

router.get('/categorias/edit/:id', async(req, res) => {

    try {

        const buscaCategoria = await Categoria.findOne({ _id: req.params.id })
        res.render('./admin/editcategoria', { buscaNome: buscaCategoria.nome,  buscaSlug: buscaCategoria.slug, buscaId: buscaCategoria.id})
        console.log(buscaCategoria);

    } catch (error) {
        req.flash('error_msg', 'Erro ao atualizar categoria')
        res.redirect('/admin/categorias')
    }
})

/* ROTAS POSTS
............................................................................................................................................*/

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

router.post('/categorias/edit', async(req, res) => {

    try {
        await Categoria.findByIdAndUpdate( { _id: req.body.idCategoria }, { nome: req.body.nome, slug: req.body.slug })
        req.flash('success_msg', 'Categoria alterada com sucesso !')
        res.redirect('/admin/categorias')

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Erro ao editar a categoria')
        res.redirect('/admin/categorias')
    }
})

router.post('/categorias/excluir', async(req, res) => {
    console.log(req.body);
    try {
        await Categoria.findOneAndDelete({ _id: req.body.idCategoria })
        req.flash('success_msg', 'Categoria deletada !')
        res.redirect('/admin/categorias')

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Erro ao deletar a categoria')
        res.redirect('/admin/categorias')
    }
})


module.exports = router