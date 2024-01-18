const express = require('express');
const app = express()
const port = process.env.PORT || 3031

app.get('/', (req,res) => res.sendFile(__dirname + '/src/html/index.html'))


app.listen(port, () => console.log(`SERVIDOR RODANDO NA PORTA ${port}`))