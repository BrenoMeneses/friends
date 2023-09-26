const {sequelize, DataTypes} = require('./connection.js')
const user = require('./usuario.js')

const friendsRequest = sequelize.define('friends_request', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

friendsRequest.belongsTo(user, {
    as: 'sender',
    foreignKey: 'senderId'
})

friendsRequest.belongsTo(user, {
    as: 'reciver',
    foreignKey: 'reciverId'
})

friendsRequest.sync()

module.exports = friendsRequest
