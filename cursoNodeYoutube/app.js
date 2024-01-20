const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars');
const Post = require('./models/Post')
const port = process.env.PORT || 3031


// Configurando Template Engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Configuração Body-Parser
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// Rotas GET
app.get('/', async(req, res) => {
    const postagem = await Post.findAll({ raw: true })
    res.render('./layouts/home', { postagem: postagem })
   
    // res.render('./layouts/home', { nome: 'Gabriel', sobrenome: 'Felix'})
    
    
    
})


app.get('/cadastrar', (req, res) => {
    res.render('./layouts/formulario')
})


// Rotas POST
app.post('/add', (req, res) => {
    console.log(req.body);
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
    .then( () => res.redirect('/'))
    .catch( (error) => res.send('Falha ao enviar post', error))
})












// Iniciando Servidor
app.listen(port, () => console.log(`SERVIDOR RODANDO NA PORTA ${port}`))