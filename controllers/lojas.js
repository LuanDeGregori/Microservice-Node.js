module.exports = function(app){

    var errorCode;
    var msg;

    app.post('/cadastro',(req,res)=>{
        var loja = req.body;
        console.log("Cadastrando nova loja...")

        req.assert("nome", "O nome da loja é obrigatório.").notEmpty();
        req.assert("endereco", "O endereco da loja é obrigatório.").notEmpty();
        req.assert("telefone", "O telefone é obrigatorio e deve ter 11 casas decimais.").notEmpty().len(11,11);
        req.assert("cnpj", "O CNPJ é obrigatorio e deve ter 14 casas decimais sem pontos.").notEmpty().len(14,14);
        req.assert("horarioAtendimento", "O horário de atendimento da loja é obrigatório.").notEmpty();
        req.assert("cidade", "O nome da cidade é obrigatório.").notEmpty();
        req.assert("estado", "O estado é obrigatório e deve conter somente 2 digitos.").notEmpty().len(2,2);

        var errors = req.validationErrors();
        if (errors){
            console.log("Erros de validação encontrados");
            errorCode = 400;
            res.status(errorCode).json(errors);
            return;
        }
        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.salva(loja, (exception, result)=>{
            console.log("Loja criada" + result);
            res.location('/lojas/' + result.insertId);
            res.status(201).json(loja);
        });
    });

    app.put('/lojas/:id', (req, res) =>{
        var loja = req.body;
        var id = req.params.id;
        loja.id = id;

        req.assert("nome", "O nome da loja é obrigatório.").notEmpty();
        req.assert("endereco", "O endereco da loja é obrigatório.").notEmpty();
        req.assert("telefone", "O telefone é obrigatorio e deve ter 11 casas decimais.").notEmpty().len(11,11);
        req.assert("cnpj", "O CNPJ é obrigatorio e deve ter 14 casas decimais sem pontos.").notEmpty().len(14,14);
        req.assert("horarioAtendimento", "O horário de atendimento da loja é obrigatório.").notEmpty();
        req.assert("cidade", "O nome da cidade é obrigatório.").notEmpty();
        req.assert("estado", "O estado é obrigatório e deve conter somente 2 digitos.").notEmpty().len(2,2);

        var errors = req.validationErrors();
        if (errors){
            console.log("Erros de validação encontrados");
            errorCode = 400;
            res.status(errorCode).json(errors);
            return;
        }

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.atualiza(loja, (erro)=>{
            if(erro){
                res.status(500).json(erro);
                return;
            }
            console.log("Loja Atualizada");
            res.json(loja);
        });
    });

    app.delete('/lojas/:id',(req,res)=>{
        //var loja = req.body;
        var id = req.params.id;

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.exclui(id, (erro,result)=>{
            if (erro){
                console.log("Erro ao excluir loja")
                res.status(500).json(erro);
                return;
            }
            if(result.affectedRows > 0){
                console.log('Loja excluida');
                var resposta = {"errorCode": "204", "msg": "Loja excluida"}
                res.status(204).send();
            }else{
                console.log("Loja não encontrada")
                res.status(400).json();
            }
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
    app.get('/lojas', (req,res)=>{
        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);

        lojaDao.buscaTudo((erro,resultado)=>{
            if (erro){
                console.log("Erro ao buscar loja.")
                res.status(500).send(erro);
                return;
            }
            console.log("Todas as lojas encontradas: " + resultado);
            res.json(resultado);
        });
    });

    app.get('/lojas/buscaEstado/:estado', (req,res)=>{
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

    app.get('/lojas/buscaEstadoCidade/:estado/:cidade', (req,res)=>{
        var estado = req.params.estado;
        var cidade = req.params.cidade;
        console.log(estado + ' e ' + cidade)

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);
        
        lojaDao.buscaPorEstadoCidade(estado,cidade,(erro,resultado)=>{
            if (erro){
                console.log("Erro ao buscar loja." + erro)
                res.status(500).send(erro);
                return;
            }
            console.log("Loja(s) encontrada(s) por estado e cidade: " + resultado);
            res.json(resultado);
        });
    });
    app.get('/lojas/buscaEstadoCidades/:estado/:cidades', (req,res)=>{
        var estado = req.params.estado;
        var cidades = req.params.cidades;
        var cidade = cidades.split("-");
        var final = []

        var connection = app.persistencia.connectionFactory();
        var lojaDao = new app.persistencia.LojaDao(connection);
        for (indice in cidade){
            console.log(cidade[indice])
            lojaDao.buscaPorEstadoCidade(estado,cidade[indice],(erro,resultado)=>{
                if (erro){
                    console.log("Erro ao buscar lojas." + erro)
                    res.status(500).send(erro);
                    return;
                }
                console.log("Loja(s) encontrada(s) por estado e cidade: " + resultado);
                final.push(resultado[2]); 
                console.log(resultado[2])   
                console.log("Tamanho: " + final.length)
            })

        }
        res.json(final) 
    });

}
