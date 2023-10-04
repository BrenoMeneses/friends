const express = require('express')
const conta = express.Router()
const {user, friendsRequest} = require('../sequelize/sequelize_config')

conta.get('/:id', async (req, res)=>{
    
    const id = req.params.id

    let meuUsuario = await user.findOne({where: {id: id}})
    if(meuUsuario === null){
        res.send("usuario nao encontrado")
    }else{

        let array = []

        let meuUsuarioConvites = await friendsRequest.findAll({where: {senderId: id}})

        for(let i=0; i<meuUsuarioConvites.length; i++){

            let reciverId = meuUsuarioConvites[i].reciverId
            let nomes = await user.findOne({where: {id: reciverId}})

            let status = meuUsuarioConvites[i].status

            array.push({
                nome: nomes.firstname,
                status: status
            })

        }

        res.render('conta', {meuUsuario: meuUsuario, meuUsuarioConvites: array})

    }

})

module.exports = conta