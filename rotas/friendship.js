const express = require('express')
const Friendship = express.Router()
const {friendship, friendsRequest, sequelize, QueryTypes} = require('../sequelize/sequelize_config')

Friendship.get('/createFriendship/:senderId/:reciverId/:status', async (req, res)=>{

    let data = req.params

    if(data.status === "aceito"){
        console.log(`"${data.status}"`)
        let query = `UPDATE friends_requests AS fr SET status = '${data.status}' WHERE fr.senderId = ${data.senderId} AND fr.reciverId = ${data.reciverId}` 

        await sequelize.query(query ,{type: QueryTypes.UPDATE})

    }

    if(data.status === "recusado"){
        console.log(`"${data.status}"`)
        let query = `UPDATE friends_requests AS fr SET status = '${data.status}' WHERE fr.senderId = ${data.senderId} AND fr.reciverId = ${data.reciverId}` 

        await sequelize.query(query ,{type: QueryTypes.UPDATE})

    }
    
    res.redirect('/conta/'+data.reciverId)

})

module.exports = Friendship
