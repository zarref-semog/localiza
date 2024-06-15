const express = require('express');

const router = express.Router();

const PromocaoController = require('../controllers/promocaoController');

router.post('/promocao', PromocaoController.inserir);
router.post('/enviar-promocao', PromocaoController.enviarPromocao);
router.put('/promocao', PromocaoController.atualizar);
router.delete('/promocao', PromocaoController.deletar);

module.exports = router;