const express = require('express')
const FriendsRequest = express.Router()
const {friendsRequest, sequelize, QueryTypes} = require('../sequelize/sequelize_config')


FriendsRequest.get('/:idSender/:idReciver', (req, res)=>{

    let data = req.params

    let request = friendsRequest.create({
        status: 'pendente',
        senderId: data.idSender,
        reciverId: data.idReciver
    })
    res.redirect('/conta/'+data.idSender)
})

FriendsRequest.get('/api/getEnviado/:idSender', async (req, res)=>{

    let senderId = req.params.idSender

    let comando = "SELECT us.firstname, fr.status, ur.firstname FROM users AS us JOIN friends_requests AS fr ON fr.senderId = us.id JOIN users AS ur ON fr.reciverId = ur.id WHERE us.id = " + senderId

    let enviado = await sequelize.query(comando ,{type: QueryTypes.SELECT})

    res.json(enviado)
})

module.exports = FriendsRequest
