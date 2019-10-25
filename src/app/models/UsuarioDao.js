class UsuarioDao {
  constructor(dbConnection) {
    this._connection = dbConnection;
  }

  inserirUsuario(usuario) {
    let dados = {
      operacao: 'inserir',
      dados: usuario,
      collection: 'usuario',
      callback: (err, result) => {
        console.log('foi!');
      }
    };

    this._connection(dados);
  }

  autenticar(usuario, req, res) {
    console.log(usuario);
    let dados = {
      operacao: 'buscar',
      collection: 'usuario',
      usuario: usuario,
      callback: (err, result) => {
        if(result && result[0] != undefined) {
          req.session.autorizado = true;
          req.session.usuario = result[0].nome;
          req.session.casa = result[0].casa;
        }

        if(req.session.autorizado) {
          res.redirect('jogo');
        } else {
          res.render('index', {validacao: {}});
        }
      }
    };
    
    console.log(this._connection(dados));
  }
}

module.exports = () => UsuarioDao;