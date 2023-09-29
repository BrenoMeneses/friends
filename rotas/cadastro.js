const express = require('express')
const cadastro = express.Router()
const {user} = require('../sequelize/sequelize_config')

cadastro.get('/', (req, res)=>{
    res.render('cadastro', {errCadastro: ""})
})

cadastro.post('/', async (req, res)=>{
    
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

module.exports = cadastro
