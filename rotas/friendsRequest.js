const express = require('express')
const FriendsRequest = express.Router()
const {friendsRequest} = require('../sequelize/sequelize_config')


FriendsRequest.get('/:idSender/:idReciver', (req, res)=>{

    let data = req.params

    let request = friendsRequest.create({
        status: 'pendente',
        senderId: data.idSender,
        reciverId: data.idReciver
    })
    res.redirect('/conta/'+data.idSender)
})

module.exports = FriendsRequest