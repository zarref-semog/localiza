const Cliente = require('../models/cliente');

module.exports = class ClienteController {

    static async inserir(req, res) {
        const cliente = new Cliente({
            nome: req.body.nome,
            cpf: req.body.cpf,
            idade: req.body.idade,
            dtNascimento: req.body.dtNascimento,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco,
            carteiraMotorista: req.body.carteiraMotorista,
            anoVencimentoCarteira: req.body.anoVencimentoCarteira,
            foto: req.body.foto
        });

        cliente.save(cliente).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados do cliente: ${cliente}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Cliente.findOne({cpf: req.body.cpf}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Cliente não encontrado para o cpf: ${req.body.cpf}`})
            } else {
                res.status(200).send(data);
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar os dados do cliente pelo cpf: ${req.body.cpf}`});
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Cliente.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Cliente não encontrado'});
            } else {
                res.status(200).send({mensagem: `Cliente ${id} alterado com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados do cliente ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Cliente não encontrado'});
            } else {
                res.status(200).send({mensagem: 'Cliente excluido com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados do cliente ${id}`});
        });
    }

}