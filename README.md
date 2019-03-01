# Microservice-Node.js
API desenvolvida em NodeJs utilizando o modulo express.

# Configurações
Para a aplicação poder funcionar é necessario configurar o banco de dados, foi utilizado o MySql e foi utilizada a seguinte querry para
criar a tabela das lojas. 
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
  
Para testar a API, recomendo utilizar o Postman e a seguinte coleção: 
https://www.getpostman.com/collections/3b8aa31a3982c205b6aa

Imagen do NodeJs construida com as configurações da API no Docker Hub:                 https://cloud.docker.com/u/luanhgdg/repository/docker/luanhgdg/node

