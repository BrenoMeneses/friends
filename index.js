const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const db = require('./sequelize/connection.js')
const user = require('./sequelize/usuario.js')
const friendsRequest = require('./sequelize/friendsRequest.js')
const firendshp = require('./sequelize/friendship.js')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))


app.get('/', (req, res)=>{
    res.render('home', {errEmail: "", errSenha: ""})
})

app.post('/cadastro', async (req, res)=>{
    
    let data = req.body

    let usuario = await user.findOne({where: {email: data.email}})
    if(usuario){
        res.redirect('/', {errEmail: "email já cadastrado", errSenha: ""})
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
            res.redirect('/', {errSenha: "senhas diferentes", errEmail: ""})
        }

    }
    
})

app.get('/conta/:id', async (req, res)=>{
    
    const id = req.params.id
    let usuario = await user.findOne({where: {id: id}})

    res.render('conta', {usuario: usuario})

})

app.listen(8081, ()=>{
    console.log("run in https://localhost:8081")
})
