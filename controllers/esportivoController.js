const Esportivo = require('../models/esportivo');
const Carro = require('../models/carro');

module.exports = class EsportivoController {

    static async inserir(req, res) {
        const carro = Carro.findOne({ placa: req.body.placa });

        const esportivo = new Esportivo({
            idCarro: carro._id,
            tp100km: req.body.tp100km,
            melhorias: req.body.melhorias,
        });

        esportivo.save(esportivo).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados do carro esportivo: ${esportivo}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Esportivo.findOne({idCarro: req.body.idCarro}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Esportivo não encontrado`});;
            } else {
                res.status(200).send(data);
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar dados do esportivo: ${req.body.idCarro}`})
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Esportivo.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Esportivo não encontrado}'});
            } else {
                res.status(200).send({mensagem: `Esportivo ${id} atualizado com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados do esportivo: ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Esportivo não encontrado'});
            } else {
                res.status(200).send({mensagem: 'Esportivo excluido com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados do esportivo ${id}`});
        });
    }

}