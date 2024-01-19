const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const conectDatabase = require('./db');
const { engine } = require('express-handlebars');
const port = process.env.PORT || 3031


// Configurando Template Engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Configuração Body-Parser
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// Rotas
app.get('/', (req, res) => {
    res.render('./layouts/formulario')
})

app.post('/add', (req, res) => {
    const { titulo, conteudo } = req.body
    console.log(titulo, conteudo);
    res.send
    (
        `<h3>Postado por: ${titulo}</h3>
        <p>Conteúdo: ${conteudo}</p>`
    )
})











// Conectando com banco de dados
conectDatabase()
// Iniciando Servidor
app.listen(port, () => console.log(`SERVIDOR RODANDO NA PORTA ${port}`))