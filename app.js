const express = require('express');
const database = require('./configs/database');

database.mongoose
.connect(database.url).then(() => {
    console.log('Conexao estabelecida com sucesso!');
}).catch(error => {
    console.log('Erro: ' + error);
    process.exit();
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var carroRouter = require('./routes/carroRouter');
app.use('/', carroRouter);

var esportivoRouter = require('./routes/esportivoRouter');
app.use('/', esportivoRouter);

var utilitarioRouter = require('./routes/utilitarioRouter');
app.use('/', utilitarioRouter);

var clienteRouter = require('./routes/clienteRouter');
app.use('/', clienteRouter);

var funcionarioRouter = require('./routes/funcionarioRouter');
app.use('/', funcionarioRouter);

var reservaRouter = require('./routes/reservaRouter');
app.use('/', reservaRouter);

var promocaoRouter = require('./routes/promocaoRouter');
app.use('/', promocaoRouter);

const HOST = '0.0.0.0';
const PORT = 3000;

app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});