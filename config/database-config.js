const { raw } = require('body-parser')
const Sequelize = require('sequelize')
require('dotenv').config()

// credenciais da base de dados
const conexao = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    port: process.env.MYSQLPORT
});


// verica a conexão
conexao.authenticate().then(function () {
    console.log('Conexão estabelecida com suceso!')
}).catch(function (erro) {
    console.log('Ocorreu um erro ao estabelecer a conexão!', erro)
})

module.exports = conexao