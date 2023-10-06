const express = require('express')
const conta = express.Router()
const {user, friendsRequest} = require('../sequelize/sequelize_config')

conta.get('/:id', async (req, res)=>{
    
    const id = req.params.id

    let meuUsuario = await user.findOne({where: {id: id}})
    if(meuUsuario === null){
        res.send("usuario nao encontrado")
    }else{

        let meuUsuarioConvites = await friendsRequest.findAll({where: {senderId: id}})

        res.render('conta', {meuUsuario: meuUsuario})

    }

})

module.exports = conta