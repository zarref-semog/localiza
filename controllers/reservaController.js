const reserva = require('../models/reserva');
const Reserva = require('../models/reserva');

module.exports = class ClienteController {

    static async inserir(req, res) {
        const reserva = new Reserva({
            placaCarro: req.body.placaCarro,
            cpfCliente: req.body.cpfCliente,
            status: req.body.status,
            dtInicio: req.body.dtInicio,
            dtFim: req.body.dtFim
        });

        reserva.save(reserva).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados da reserva: ${reserva}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Reserva.findOne({cpfCliente: req.body.cpfCliente}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Reserva não encontrada para o cpf: ${req.body.cpfCliente}`});
            } else {
                res.status(200).send(data);
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar os dados da reserva pelo cpf: ${req.body.cpfCliente}`});
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        Reserva.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Reserva não envontrada'});
            } else {
                res.status(200).send();
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados da reserva pelo id: ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Reserva não encontrada'});
            } else {
                res.status(200).send({mensagem: 'Reserva excluida com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados da reserva ${id}`});
        });
    }

}