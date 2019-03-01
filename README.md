# Microservice-Node.js
API desenvolvida em NodeJs utilizando o modulo express.

# Intruções 

Para rodar a aplicação são necessarios alguns pré-requisitos:
- NodeJS
- MySql

Após baixar os pré-requisitos primeiro passo é executar o comando ```npm intall ```, que irá baixar todas dependencias do NodeJs que 
estão contidas no arquivo package.json. 
Para a aplicação poder funcionar é necessario configurar o banco de dados, criaremos uma databese e utilizaremos ela:
```
CREATE DATABASE desafios;
USE desafios;
```
E para criar a tabela devemos executar a seguinte querry:
```
CREATE TABLE `lojas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `telefone` decimal(11,0) NOT NULL,
  `cnpj` decimal(11,0) NOT NULL,
  `horarioAtendimento` text,
  `cidade` varchar(255) NOT NULL,
  `estado` varchar(2) NOT NULL,
   PRIMARY KEY (id)
  );
 ```
Na pasta ```persistencia``` devemos abrir o arquivo ```connectionFactory.js``` e configurar o MySql com seu usuario e senha, como no exemplo abaixo:
```
//connectionFactory.js
var mysql  = require('mysql');

function createDBConnection(){
  return mysql.createConnection({
  host: 'localhost',
  user: 'root',         //seu usuario
  password: '',         //sua senha
  database: 'desafios'  //sua database
  });
}
module.exports = function() {
  return createDBConnection;
}
```
Se tudo ocorreu bem, as dependencias já estão baixadas e seu MySql está devidamente configurado. Agora já podemos testar a nossa aplicação.

Utilizando o comando ```npm start``` o servidor irá iniciar e a mensagem ```Servidor rodando na porta 3000.``` deverá ser exibida no seu console.

# Testando API
Se estiver tudo certo até aqui, nos ja podemos cadastrar, editar, excluir e consultar as lojas. Recomendo utilizar o Postman para realizar as consultas. Já existe uma Collection com os comandos para realizar as consultas, que pode ser baixado clicando [aqui.]( https://www.getpostman.com/collections/3b8aa31a3982c205b6aa)

### Cadastar loja
Para cadastrar uma nova loja devemos utilizar o método POST do Postman, nele devemos passar:
- URL:  ``` http://localhost:3000/cadastro ```
- A loja: 
```
{
  "nome": "Loja A",
  "endereco": "Rua Abc, 000",
  "telefone": "00 1111 2222",
  "cnpj": "00 111 222 3333 44",
  "horarioAtendimento": "Diariamente das 11hs às 23hs",
  "cidade": "Cidade ABC",
  "estado": "RS"
}
```
- E o tipo ``` Content-Type = application/json ```

### Editar loja
Para editar uma loja devemos utilizar o método PUT do Postman, nele devemos passar:
- URL:  ``` http://localhost:3000/lojas/{id}``` , no lugar de ```{id}``` passamos o id da loja que queremos alterar.
- A loja editada: 
```
{
  "nome": "Loja B",
  "endereco": "Rua Cba, 001",
  "telefone": "11 2222 3333",
  "cnpj": "00 111 222 3333 44",
  "horarioAtendimento": "Diariamente das 14hs às 22hs",
  "cidade": "Cidade DEF",
  "estado": "RS"
}
```
- E o tipo ``` Content-Type = application/json ```

### Deletar loja
Para deletar uma loja devemos utilizar o método DELETE do Postman, nele devemos passar somente a URL:
- URL:  ``` http://localhost:3000/lojas/{id}``` , no lugar de ```{id}``` passamos o id da loja que queremos deletar.

### Buscar loja por ID
Para buscar uma loja pelo seu ID devemos utilizar o método GET do Postman, nele devemos passar somente a URL:
- URL:  ``` http://localhost:3000/lojas/buscaId/{id}``` , no lugar de ```{id}``` passamos o id da loja que queremos buscar.

### Buscar todas as lojas de um estado
Para buscar todas as lojas de um estado devemos utilizar o método GET do Postman, nele devemos passar somente a URL:
- URL:  ``` http://localhost:3000/lojas/buscaEstado/{estado}``` , no lugar de ```{estado}``` passamos o estado que queremos buscar.

# Mais...
A imagem do NodeJs com o servidor rodando pode ser encontrada no Docker Hub cliando [aqui.](https://cloud.docker.com/u/luanhgdg/repository/docker/luanhgdg/node)

Podemos ainda verificar a documentação interativa da API no Swagger, utilizando o arquivo ```swagger.yaml```. Indo ate o [site](https://editor.swagger.io/) do Swagger Editor, clicando na aba "File" e selecionando a opção "Import File" selecionamos o arquivo e clicamos em "Open File". 
Assim poderemos verificar a documentação da nossa API.
