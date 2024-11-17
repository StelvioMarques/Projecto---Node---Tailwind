const express = require('express')
const template_engine = require('express-handlebars')
const body_parser = require('body-parser')
const Carro = require('./models/carro')
const { where } = require('sequelize')
const app = express()

require('./models/carro')

// configuração do body parser
app.use(body_parser.urlencoded({ extended: true }));

// configuração do handlebars
app.engine('handlebars', template_engine.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Pasta onde os estarão os templates
app.set('views', './views')


app.get('/', function (req, res) {
    res.render('home', { title: 'Welcome' })
})

app.get('/adicionar', function (req, res) {
    res.render('adicionar', { title: 'Adicionar carro' })
})

app.post('/adicionar-dados', function (req, res) {
    var Marca = req.body.marca
    var Modelo = req.body.modelo
    var AnoFabrico = req.body.ano
    var Preco = req.body.preco
    var NomeProprietario = req.body.Proprietario

    Carro.create({
        marca: Marca,
        modelo: Modelo,
        ano_de_fabrico: AnoFabrico,
        preco: Preco,
        proprietario: NomeProprietario
    }).then(function () {
        console.log('Dados inseridos com sucesso!')
        res.redirect('listar')
    }).catch(function (error) {
        console.log('Ocorreu um erro ao inserir os dados', error)
    })
})

app.get('/listar', function (req, res) {
    Carro.findAll().then(function (resgistros) {
        console.log('Lista de dados: ', resgistros)
        res.render('listar', { title: 'Listar carros', registro: resgistros })
    })
})

app.get('/actualizar', function (req, res) {
    Carro.findAll().then(function (resgistros) {
        console.log('Lista de dados: ', resgistros)
        res.render('actualizar', { title: 'Actualizar dados do carro', registro: resgistros })
    })
})

app.post('/actualizar-dado/:id', function (req, res) {
    Carro.update({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano_de_fabrico: req.body.ano,
        preco: req.body.preco,
        proprietario: req.body.Proprietario
    }, { where: { 'id': req.params.id } }).then(function () {
        console.log('Dados actualizados com sucesso!')
        res.redirect('/listar')
    }).catch(function (error) {
        console.log('Ocorreu um erro ao actualizar os dados', error)
    })
})

app.get('/apagar', function(req, res){
    Carro.findAll().then(function (resgistros) {
        console.log('Lista de dados: ', resgistros)
        res.render('apagar', { title: 'apagar dados de um carro', registro: resgistros })
    }).catch(function(error){
        console.log('Ocorreu um erro ao buscar os regisros: ', erro)
    })
})

app.post('/apagar-dados/:id', function(req, res){
    Carro.destroy({where: {'id': req.params.id}}).then(function(){
        console.log('Dados apagados com suceso!')
        res.redirect('/listar')
    })
})

app.listen(3000, function () {
    console.log('Servidor ligado na porta http://localhost:3000')
})