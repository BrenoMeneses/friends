const Sequelize = require('sequelize')
const sequelize = new Sequelize("amigos", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(()=>{
    console.log('Conecxão feita com sucesso')
}).catch((err)=>{
    console.log(err)
})


module.exports = {
    sequelize: sequelize,
    DataTypes: Sequelize.DataTypes,
    QueryTypes: Sequelize.QueryTypes 
}