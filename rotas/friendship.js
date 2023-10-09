const express = require('express')
const Friendship = express.Router()
const {friendship, friendsRequest, sequelize, QueryTypes} = require('../sequelize/sequelize_config')

Friendship.get('/createFriendship/:senderId/:reciverId/:status', async (req, res)=>{

    let data = req.params

    if(data.status === "aceito"){

        let query = `UPDATE friends_requests AS fr SET status = '${data.status}' WHERE fr.senderId = ${data.senderId} AND fr.reciverId = ${data.reciverId}`
        await sequelize.query(query ,{type: QueryTypes.UPDATE})

        let query2 = `SELECT * FROM friendships WHERE friend1 = ${data.senderId} AND friend2 = ${data.reciverId}`
        let exists = await sequelize.query(query2, {type: QueryTypes.SELECT})
        
        let query3 = `SELECT * FROM friendships WHERE friend1 = ${data.reciverId} AND friend2 = ${data.senderId}`
        let exists2 = await sequelize.query(query3, {type: QueryTypes.SELECT})

        if(exists.length === 0 && exists2.length === 0){
            await friendship.create({
                friend1: data.senderId,
                friend2: data.reciverId
            })
        }

    }

    if(data.status === "recusado"){
        
        let query = `UPDATE friends_requests AS fr SET status = '${data.status}' WHERE fr.senderId = ${data.senderId} AND fr.reciverId = ${data.reciverId}` 

        await sequelize.query(query ,{type: QueryTypes.UPDATE})

    }
    res.redirect('/conta/'+data.reciverId)

})

Friendship.get('/api/getFriendship/:id', async (req, res)=>{

    let id = req.params.id

    let query = `SELECT * FROM friendships WHERE friend1 = ${id} OR friend2 = ${id}`
    let friend1 = await sequelize.query(query ,{type: QueryTypes.SELECT})

    if(friend1.length === 0 ){
        res.json("nenhum amigo encontrado")

    }else {

        let array = []
        
        friend1.forEach((element) => {
            
            if(element.friend1 != id){
                array.push(element.friend1)
            }

            if(element.friend2 != id){
                array.push(element.friend2)
            }

        })

        let userArray = []

        for(let i=0; i<array.length; i++){
            
            let query1 = `SELECT firstname, lastname FROM users WHERE id = ${array[i]}`
            let friend = await sequelize.query(query1 ,{type: QueryTypes.SELECT})

            friend.forEach(Element => {
                let User = {
                    firstname: Element.firstname,
                    lastname: Element.lastname
                }
                userArray.push(User)
            })

        }
        res.json(userArray)

    }

})

module.exports = Friendship
