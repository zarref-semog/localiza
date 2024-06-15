const Utilitario = require('../models/utilitario');
const Carro = require('../models/carro');

module.exports = class UtilitarioController {

    static async inserir(req, res) {
        const carro = Carro.findOne({ placa: req.body.placa });

        const utilitario = new Utilitario({
            idCarro: carro._id,
            qtdPassageiro: req.body.qtdPassageiro,
            tmBagageiro: req.body.tmBagageiro,
            kmLitro: req.body.kmLitro,
        });

        utilitario.save(utilitario).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados do carro utilitario: ${utilitario}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Utilitario.findOne({idCarro: req.body.idCarro}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Utilitario não encontrado`});;
            } else {
                res.status(200).send(data);
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar dados do utilitario: ${req.body.idCarro}`})
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Utilitario.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Utilitario não encontrada para a placa: ${req.body.placa}`})
            } else {
                res.status(200).send({mensagem: `Reserva ${id} atualizada com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados do utilitario ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Utilitario não encontrado'});
            } else {
                res.status(200).send({mensagem: 'Utilitario excluido com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados do utilitario ${id}`});
        });
    }

}