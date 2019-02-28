module.exports = function(app){
    
    app.post('/cadastro',(req,res)=>{
        var loja = req.body;
        console.log("Cadastrando nova loja...")

        req.assert("nome", "O nome da loja é obrigatório.").notEmpty();
        req.assert("endereco", "O endereco da loja é obrigatório.").notEmpty();
        req.assert("telefone", "O telefone é obrigatorio e deve ter 10 casas decimais.").notEmpty().len(10);
        req.assert("cnpj", "O CNPJ é obrigatorio e deve ter 14 casas decimais sem pontos.").notEmpty().len(14);
        req.assert("horarioAtendimento", "O horário de atendimento da loja é obrigatório.").notEmpty();
        req.assert("cidade", "O nome da cidade é obrigatório.").notEmpty();
        req.assert("estado", "O estado é obrigatório e deve conter somente 2 digitos.").notEmpty().len(2);

        var errors = req.validationErrors();
        if (errors){
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }
        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.salva(loja, (exception, result)=>{
            console.log(exception);
            console.log("Loja criada" + result);
            res.location('/lojas/' + result.insertId);
            res.status(201).json(loja);
        });
    });

    app.put('/lojas/:id', (req, res) =>{
        var loja = req.body;
        var id = req.params.id;
        loja.id = id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.atualiza(loja, (erro)=>{
            if(erro){
                res.status(500).send(erro);
                res.send(loja);
                return;
            }
            console.log("Loja Atualizada");
            res.send(loja);
        });
    });

    app.delete('/lojas/:id',(req,res)=>{
        //var loja = req.body;
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.exclui(id, (erro)=>{
            if (erro){
                res.status(500).send(erro);
                return;
            }
            console.log('Loja Excluida');
            res.status(204).send();
        });
    });

    app.get('/lojas/buscaId/:id', (req,res)=>{
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaPorId(id,(erro,resultado)=>{
            if (erro){
                console.log("Erro ao buscar loja.")
                res.status(500).send(erro);
                return;
            }
            console.log("Loja encontrada por id: " + resultado);
            res.json(resultado);
        });
    });

    app.get('/lojas/BuscaEstado/:estado', (req,res)=>{
        var estado = req.params.estado;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);
        
        lojaDao.buscaPorEstado(estado,(erro,resultado)=>{
            if (erro){
                console.log("Erro ao buscar loja.")
                res.status(500).send(erro);
                return;
            }
            console.log("Loja encontrada por estado: " + resultado);
            res.json(resultado);
        });
    });
}