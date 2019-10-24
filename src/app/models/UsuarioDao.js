class UsuarioDao {
  constructor(dbConnection) {
    this._connection = dbConnection;
  }

  inserirUsuario(usuario) {
    let dados = {
      operacao: 'inserir',
      usuario: usuario,
      collection: 'usuario',
      callback: (err, result) => {
        console.log('foi!');
      }
    };

    this._connection(dados);
  }
}

module.exports = () => UsuarioDao;