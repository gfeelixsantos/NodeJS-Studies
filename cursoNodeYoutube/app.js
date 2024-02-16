// Carregando Express
const express = require('express');
const app = express()

// Carregando demais módulos
const path = require('path')
const port = process.env.PORT || 3031

// Configurando Template Engine
const { engine } = require('express-handlebars');
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Configuração Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// Configuração de pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Configurações de sessão do usuário
const session = require('express-session')
const flash = require('connect-flash')
app.use( session(
    {
        secret: 'cursodenodejs',
        resave: true,
        saveUninitialized: true
    }
))
app.use(flash())

// Configuração do Middleware (Locals - variável global)
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// Configuração de Rotas
const admin = require('./routers/admin')
const usuario = require('./routers/usuario')
app.use('/admin', admin)
app.use('/usuario', usuario)


// Configuração banco de dados (MongoDB)
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/blogapp')
    .then( () => console.log('Conectado ao banco MongoDB'))
    .catch( (error) => console.log('Erro ao conectar com banco', error))


// Configuração Home-Page
const Postagem = mongoose.model('postagens')
const Categoria = mongoose.model('categorias')

app.get('/', async(req, res) => {
    
    try {
        const listaPostagem = await Postagem.find().sort({ data: "desc" })
        res.render('./index', { listaPostagem: listaPostagem.map( e => e.toJSON()) })
        
    } catch (error) {
        req.flash('error_msg', 'Um erro foi identificado...')
        res.redirect('/404')
    }
})

app.get('/filtropostagem/:categoria', async (req, res) => {

    const listaPostagem = await Postagem.find({ categoria: req.params.categoria })
    res.render('./filtropostagem', { listaPostagem: listaPostagem.map( e => e.toJSON()), grupo: req.params.categoria })
})

app.get('/categorias', async (req, res) => {

    const listaCategorias = await Categoria.find()
    res.render('./categorias', {listaCategorias: listaCategorias.map( e => e.toJSON())})
})




// Iniciando Servidor
app.listen(port, () => console.log(`SERVIDOR RODANDO NA PORTA ${port}`))