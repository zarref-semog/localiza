const Carro = require('../models/carro');

module.exports = class CarroController {

    static async inserir(req, res) {
        const carro = new Carro({
            placa: req.body.placa,
            ano: req.body.ano,
            modelo: req.body.modelo,
            tipo: req.body.tipo,
            quilometragem: req.body.quilometragem,
            diaria: req.body.diaria,
            observacao: req.body.observacao
        });

        carro.save(carro).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados do carro: ${carro}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Carro.findOne({placa: req.body.placa}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Carro não encontrada para a placa: ${req.body.placa}`})
            } else {
                res.status(200).send({mensagem: `Reserva ${id} atualizada com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar os dados do carro pela placa: ${req.body.placa}`});
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Carro não encontrada para a placa: ${req.body.placa}`})
            } else {
                res.status(200).send({mensagem: `Reserva ${id} atualizada com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar os dados do carro pela placa: ${req.body.placa}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Carro não encontrado'});
            } else {
                res.status(200).send({mensagem: 'Carro excluido com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados do carro ${id}`});
        });
    }

}