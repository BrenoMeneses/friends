const express = require('express')
const api = express.Router()
const {sequelize, QueryTypes} = require('../sequelize/sequelize_config')

api.get('/user/:id', async (req, res)=>{

    let id = req.params.id

    let data = await sequelize.query('SELECT * from users WHERE id <> '+id, {type:QueryTypes.SELECT})

    res.json(data)

})

module.exports = api