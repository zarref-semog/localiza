const Promocao = require('../models/promocao');
const Cliente = require('../models/cliente');

module.exports = class PromocaoController {

    static async inserir(req, res) {
        const promocao = new Promocao({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            dtValidade: req.body.dtValidade,
        });

        promocao.save(promocao).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados da promocao: ${promocao}.`});
        })
    }

    static async enviarPromocao(req, res) {
        const { id } = req.query;

        const promocao = await Promocao.findOne({id: id});

        const clientes = await Cliente.find();

        res.json({'promocao': promocao, 'clientes': clientes});
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Funcionario.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Promocao não encontrada'})
            } else {
                res.status(200).send({mensagem: `Promocao ${id} atualizada com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados da promocao ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Promocao não encontrada'});
            } else {
                res.status(200).send({mensagem: 'Promocao excluida com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados da promocao ${id}`});
        });
    }

}