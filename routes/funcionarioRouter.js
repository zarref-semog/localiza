const express = require('express');

const router = express.Router();

const FuncionarioController = require('../controllers/funcionarioController');

router.post('/funcionario', FuncionarioController.inserir);
router.get('/funcionario', FuncionarioController.buscar);
router.put('/funcionario', FuncionarioController.atualizar);
router.delete('/funcionario', FuncionarioController.deletar);

module.exports = router;