const {sequelize, DataTypes} = require('./connection.js')
const user = require('./usuario.js')

const friendship = sequelize.define('friendship', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

friendship.belongsTo(user, {
    as: 'friends1',
    foreignKey: 'friend1'
})

friendship.belongsTo(user, {
    as: 'friends2',
    foreignKey: 'friend2'
})

friendship.sync()

module.exports = friendship
