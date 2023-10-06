const express = require('express')
const FriendsRequest = express.Router()
const {friendsRequest, sequelize, QueryTypes} = require('../sequelize/sequelize_config')


FriendsRequest.get('/:idSender/:idReciver', async (req, res)=>{

    let data = req.params
    let query = `SELECT * FROM friends_requests AS fr WHERE senderId = ${data.idSender} AND reciverId = ${data.idReciver}`
  
    let exists = await sequelize.query(query, {type: QueryTypes.SELECT})
    console.log(exists)

    if(exists.length === 0){
        let request = await friendsRequest.create({
            status: 'pendente',
            senderId: data.idSender,
            reciverId: data.idReciver
        })
        res.redirect('/conta/'+data.idSender)
    }else{
        res.redirect('/conta/'+data.idSender)
    }


    
})

FriendsRequest.get('/api/getEnviado/:idSender', async (req, res)=>{

    let senderId = req.params.idSender

    let nomeStatus = "SELECT UR.firstname, FR.status FROM users AS US JOIN friends_requests AS FR ON FR.senderId = US.id JOIN users AS UR ON FR.reciverId = UR.id WHERE US.id = "+senderId

    let nomeStatusQuery = await sequelize.query(nomeStatus ,{type: QueryTypes.SELECT})
    
    res.json(nomeStatusQuery)

})

FriendsRequest.get('/api/getRecebido/:idReciver', async (req, res)=>{

    let reciverId = req.params.idReciver

    let nomeStatus = "SELECT US.firstname, FR.status, FR.senderId FROM users AS UR JOIN friends_requests AS FR ON FR.reciverId = UR.id JOIN users AS US ON FR.senderId = US.id WHERE UR.id = "+reciverId


    let nomeStatusQuery = await sequelize.query(nomeStatus ,{type: QueryTypes.SELECT})
    
    res.json(nomeStatusQuery)

})

module.exports = FriendsRequest
