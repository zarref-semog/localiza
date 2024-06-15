const express = require('express');

const router = express.Router();

const UtilitarioController = require('../controllers/utilitarioController');

router.post('/carro-utilitario', UtilitarioController.inserir);
router.get('/carro-utilitario', UtilitarioController.buscar);
router.put('/carro-utilitario', UtilitarioController.atualizar);
router.delete('/carro-utilitario', UtilitarioController.deletar);

module.exports = router;