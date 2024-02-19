const express = require('express')
const router = express.Router()
const { isAdmin } = require('../helpers/isAdmin')

// Importando informações do banco para registrar na rota POST
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')

router.get('/', isAdmin, (req, res) => {
    res.send('Index')
})

router.get('/postagens', async (req, res) => {
    let listaPostagens = await Postagem.find()
    res.render('./admin/postagens', { listaPostagens: listaPostagens.map( e => e.toJSON()) })
})

router.get('/postagens/add', isAdmin, async(req, res) => {
    try {
        const listagemCategorias = await Categoria.find()
        res.render('./admin/postagensadd', { listagemCategorias: listagemCategorias.map( e => e.toJSON())})

    } catch (error) {
        req.flash('error_msg', 'Erro ao criar nova postagem')
        res.redirect('/admin/postagens')
    }
})

router.get('/postagem/edit/:id', isAdmin, async (req, res) => {
    const buscaPostagem = await Postagem.findOne({ _id: req.params.id })
    const categorias = await Categoria.find().sort({nome: 'asc'})
    res.render('./admin/editpostagens', { buscaPostagem: buscaPostagem.toJSON(), categorias: categorias.map( categorias => categorias.toJSON()) })
})

router.get('/categorias', async(req, res) => {
    const categorias = await Categoria.find().sort({nome: 'asc'})
    res.render('./admin/categorias', { categorias: categorias.map( categoria => categoria.toJSON())})
})

router.get('/categorias/add', isAdmin, (req, res) => {
    res.render('./admin/categoriaadd')
})

router.get('/categorias/edit/:id', isAdmin, async(req, res) => {

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

router.post('/postagens/new', async (req, res) => {

    const { titulo, categoria, conteudo } = req.body

    try {
        const newPost = {
            titulo: titulo,
            categoria: categoria,
            conteudo: conteudo
        }
    
        await new Postagem(newPost).save()
        req.flash('success_msg', 'Postagem realizada !')
        res.redirect('/admin/postagens')

    } catch (error) {
        console.log(error);
        req.flash('error_msg', 'Erro ao realizar a postagem.')
        res.redirect('/admin/postagens')
    }
})

router.post('/postagem/edit', async (req, res) => {

    const { idPostagem, tituloPostagem, categorias, conteudo} = req.body
    await Postagem.findOneAndUpdate({ _id: idPostagem}, {
        titulo: tituloPostagem,
        categoria: categorias,
        conteudo: conteudo
    })
    req.flash('success_msg', 'Postagem atualizada !')
    res.redirect('/admin/postagens')
})

router.post('/postagem/delete/:id', async (req, res) => {

    await Postagem.findByIdAndDelete({ _id: req.body.idPostagem })
    req.flash('success_msg', 'Postagem deletada')
    res.redirect('/admin/postagens')
})


module.exports = router