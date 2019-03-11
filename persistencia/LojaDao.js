function LojaDao(connection) {
    this._connection = connection;
  }

  LojaDao.prototype.salva = function(loja,callback) {
      this._connection.query('INSERT INTO lojas SET ?', loja, callback);
  }

  LojaDao.prototype.exclui = function (id,callback) {
    this._connection.query("delete from lojas where id = ?",[id],callback);
  }

  LojaDao.prototype.lista = function(callback) {
      this._connection.query('select * from lojas',callback);
  }

  LojaDao.prototype.atualiza = function(loja,callback) {
    this._connection.query('update lojas SET nome =?, endereco = ?, telefone = ?, cnpj = ?,horarioAtendimento = ?, cidade = ?, estado = ? where id = ?',
    [loja.nome, loja.endereco, loja.telefone, loja.cnpj, loja.horarioAtendimento, loja.cidade, loja.estado, loja.id],
    callback);
}

  LojaDao.prototype.buscaPorId = function (id,callback) {
      this._connection.query("select * from lojas where id = ?",[id],callback);
  }

  LojaDao.prototype.buscaPorEstado = function (estado,callback) {
    this._connection.query("select * from lojas where estado = ?",[estado],callback);
}
  LojaDao.prototype.buscaTudo = function (callback) {
    this._connection.query("select * from lojas",callback);
}

LojaDao.prototype.buscaPorEstadoCidade = function (estado,cidade,callback) {
  this._connection.query("select * from lojas where estado = ? && cidade = ?",[estado,cidade],callback);
}

LojaDao.prototype.buscaPorEstadoECidades = function (estado, callback) {
  this._connection.query(" select * from lojas where (cidade = ? || cidade = ? || cidade =?) && estado =?",[cidade1, cidade2, cidade3, estado],callback);
}

  module.exports = function(){
      return LojaDao;
  };