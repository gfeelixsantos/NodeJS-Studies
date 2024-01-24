const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars');
const Post = require('./models/Post');
const port = process.env.PORT || 3031


// Configurando Template Engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Configuração Body-Parser
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//...................... Rotas GET

// LE TODOS OS POST DO BANCO DE DADOS
app.get('/', async(req, res) => {
    const postagem = await Post.findAll({ raw: true, order:[['id', 'DESC']] })
    res.render('./layouts/home', { postagem: postagem })
 
})


app.get('/cadastrar', (req, res) => {
    res.render('./layouts/formulario')
})

// DELETA UM POST
app.get('/deletar/:id', (req, res) => {
    try {
        Post.destroy({ where: {'id': req.params.id} })
        res.render('./layouts/alert')
        
    } catch (error) {
        res.send('Erro ao deletar', error)
    }
})

app.get('/alterar/:id', async(req, res) => {
    const postagem = await Post.findByPk(req.params.id, { raw: true })
    res.render('./layouts/change', { postagem: postagem })
})


//...................... Rotas POST

// ADICIONA UM NOVO POST
app.post('/add', async(req, res) => {
    console.log(req.body);
    try{
       await Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        })
        res.redirect('/')

    } catch(error) {
        res.send('Falha ao enviar post', error)
    }

})

// ATUALIZA NOVO POST
app.post('/atualizar/:id', async (req, res) => {
    try {
        await Post.update(
        {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }, 
        {
            where: { id: req.params.id }
        })
        res.redirect('/')

    } catch (error) {
        res.send('Error ao atualizar!', error)
    }
})





// Iniciando Servidor
app.listen(port, () => console.log(`SERVIDOR RODANDO NA PORTA ${port}`))