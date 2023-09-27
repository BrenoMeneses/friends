const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const {QueryTypes, sequelize} = require('./sequelize/connection.js')
const user = require('./sequelize/usuario.js')
const friendsRequest = require('./sequelize/friendsRequest.js')
const firendshp = require('./sequelize/friendship.js')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))

// rotas =======================================================================================================
// =============================================================================================================
// =============================================================================================================

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/cadastro', (req, res)=>{
    res.render('cadastro', {errCadastro: ""})
})

app.post('/cadastro', async (req, res)=>{
    
    let data = req.body

    let usuario = await user.findOne({where: {email: data.email}})
    if(usuario){
        res.render('cadastro', {errCadastro: "email já cadastrado"})
    }else{

        if(data.senha === data.confSenha){

            let novoUser = await user.create({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.confSenha
            })

            res.redirect('/conta/' + novoUser.id)

        }else{
            res.render('cadastro', {errCadastro: "senhas diferentes"})
        }

    }
    
})

app.get('/conta/:id', async (req, res)=>{
    
    const id = req.params.id

    let meuUsuario = await user.findOne({where: {id: id}})
    if(meuUsuario === null){
        res.send("usuario nao encontrado")
    }else{
        res.render('conta', {meuUsuario: meuUsuario})
    }


})

app.get('/login', (req, res)=>{
    res.render('login', {errLogin: ""})
})

app.post('/login', async (req, res)=>{

    let data = req.body

    let usuario = await user.findOne({where: {email: data.email}})
    if(usuario){

        if(data.senha === usuario.password){
            res.redirect('/conta/' + usuario.id)
        }else{
            res.render('login', {errLogin: "senha incorreta"})
        }

    }else{
        res.render('login', {errLogin: "email não encontrado"})
    }

})

app.get('/api/:id', async (req, res)=>{

    let id = req.params.id

    let data = await sequelize.query('SELECT * from users WHERE id <> '+id, {type:QueryTypes.SELECT})

    return res.json(data)

})

app.listen(8081, ()=>{
    console.log("run in https://localhost:8081")
})
