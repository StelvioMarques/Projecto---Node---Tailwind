const { raw } = require('body-parser')
const Sequelize = require('sequelize')

// credenciais da base de dados
const conexao = new Sequelize('crud', 'root', 'Station007', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
})

// verica a conexão
conexao.authenticate().then(function(){
    console.log('Conexão estabelecida com suceso!')
}).catch(function(erro){
    console.log('Ocorreu um erro ao estabelecer a conexão!', erro)
})

module.exports = conexao