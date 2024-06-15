const Funcionario = require('../models/funcionario');

module.exports = class FuncionarioController {

    static async inserir(req, res) {
        const funcionario = new Funcionario({
            nome: req.body.nome,
            cpf: req.body.cpf,
            idade: req.body.idade,
            dtNascimento: req.body.dtNascimento,
            telefone: req.body.telefone,
            email: req.body.email,
            endereco: req.body.endereco,
            salario: req.body.salario,
            qtAlugueis: req.body.qtAlugueis,
            status: req.body.status
        });

        funcionario.save(funcionario).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar inserir os dados do funcionario: ${funcionario}.`});
        })
    }

    static async buscar(req, res) {
        console.log(req.body);

        Funcionario.findOne({cpf: req.body.cpf}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Funcionario não encontrado para o cpf: ${req.body.cpf}`})
            } else {
                res.status(200).send(data);
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar buscar os dados do funcionario pelo cpf: ${req.body.cpf}`});
        });
    }

    static async atualizar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Funcionario.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': `Funcionario não encontrado para a placa: ${req.body.placa}`})
            } else {
                res.status(200).send({mensagem: `Funcionario ${id} atualizado com sucesso!`});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar atualizar os dados do funcionario ${id}`});
        });
    }

    static async deletar(req, res) {
        console.log(req.body);

        const { id } = req.query;

        Carro.findByIdAndDelete(id, {useFindAndModify: false}).then(data => {
            if (!data) {
                res.status(404).json({'mensagem': 'Funcionario não encontrado'});
            } else {
                res.status(200).send({mensagem: 'Funcionario excluido com sucesso!'});
            }
        }).catch(error => {
            res.status(500).send({mensagem: error.message || `Erro ao tentar excluir os dados do funcionario ${id}`});
        });
    }

}