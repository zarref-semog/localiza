const express = require('express');

const router = express.Router();

const CarroController = require('../controllers/carroController');

router.post('/carro', CarroController.inserir);
router.get('/carro', CarroController.buscar);
router.put('/carro', CarroController.atualizar);
router.delete('/carro', CarroController.deletar);

module.exports = router;