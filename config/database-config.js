const { raw } = require('body-parser')
const Sequelize = require('sequelize')

// credenciais da base de dados
const conexao = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
  
  
// verica a conexão
conexao.authenticate().then(function(){
    console.log('Conexão estabelecida com suceso!')
}).catch(function(erro){
    console.log('Ocorreu um erro ao estabelecer a conexão!', erro)
})

module.exports = conexao