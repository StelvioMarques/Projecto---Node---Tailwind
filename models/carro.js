const conexao = require('../config/database-config')
const {DataTypes} = require('sequelize')

// tabela carro
const Carro = conexao.define('carros', {
    marca: DataTypes.STRING(30),
    modelo: DataTypes.STRING(30),
    ano_de_fabrico: DataTypes.INTEGER(4),
    preco: DataTypes.FLOAT(10),
    proprietario: DataTypes.CHAR(50)
})

//Carro.sync({force: true})

module.exports = Carro