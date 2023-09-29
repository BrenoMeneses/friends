const express = require('express')
const login = express.Router()
const {user} = require('../sequelize/sequelize_config')

login.get('/', (req, res)=>{
    res.render('login', {errLogin: ""})
})

login.post('/', async (req, res)=>{

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

module.exports = login