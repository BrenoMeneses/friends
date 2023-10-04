// dependencias ===========================================================================================
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

// config ========================================================================================================
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'))

// rotas ==============================================================================================================
app.use('/', require('./rotas/home'))
app.use('/cadastro', require('./rotas/cadastro'))
app.use('/conta', require('./rotas/conta'))
app.use('/login', require('./rotas/login'))
app.use('/login', require('./rotas/login'))
app.use('/friendRequest', require('./rotas/friendsRequest'))
app.use('/user', require('./rotas/api'))

//rodando o servidor na porta 8081 ===================================================================================
app.listen(8081, ()=>{
    console.log("run in https://localhost:8081")
})
