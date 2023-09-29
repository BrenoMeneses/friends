const {sequelize, QueryTypes} = require('./connection')
const friendship = require('./friendship')
const friendRequest = require('./friendsRequest')
const user = require('./usuario')

module.exports = {
    sequelize: sequelize,
    QueryTypes: QueryTypes,
    friendship: friendship,
    friendsRequest: friendRequest,
    user: user
}
