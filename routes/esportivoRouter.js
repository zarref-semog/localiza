const express = require('express');

const router = express.Router();

const EsportivoController = require('../controllers/esportivoController');

router.post('/carro-esportivo', EsportivoController.inserir);
router.get('/carro-esportivo', EsportivoController.buscar);
router.put('/carro-esportivo', EsportivoController.atualizar);
router.delete('/carro-esportivo', EsportivoController.deletar);

module.exports = router;