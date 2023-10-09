const express = require('express')
const FriendsRequest = express.Router()
const {friendsRequest, sequelize, QueryTypes} = require('../sequelize/sequelize_config')


FriendsRequest.get('/:idSender/:idReciver', async (req, res)=>{

    let data = req.params

    let query = `SELECT * FROM friends_requests AS fr WHERE senderId = ${data.idSender} AND reciverId = ${data.idReciver}`
    let exists = await sequelize.query(query, {type: QueryTypes.SELECT})
    let query1 = `SELECT * FROM friends_requests AS fr WHERE senderId = ${data.idReciver} AND reciverId = ${data.idSender}`
    let exists1 = await sequelize.query(query1, {type: QueryTypes.SELECT})

    console.log(exists, exists1)

    if(exists.length === 0 && exists1.length === 0){
        let request = await friendsRequest.create({
            status: 'pendente',
            senderId: data.idSender,
            reciverId: data.idReciver
        })
    }
    
    if(exists.length > 0){
        if(exists[0].status === "recusado"){
            let query = `UPDATE friends_requests AS fr SET status = 'pendente' WHERE fr.senderId = ${data.idSender} AND fr.reciverId = ${data.idReciver}`
            await sequelize.query(query ,{type: QueryTypes.UPDATE})
        }
    }

    if(exists1.length > 0){ 
        if(exists1[0].status === "recusado"){
            let query = `UPDATE friends_requests AS fr SET status = 'pendente' WHERE fr.senderId = ${data.idReciver} AND fr.reciverId = ${data.idSender}`
            await sequelize.query(query ,{type: QueryTypes.UPDATE})
        }
    }


    res.redirect('/conta/'+data.idSender)

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
