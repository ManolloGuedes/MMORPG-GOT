class JogoDao {
  constructor(dbConnection) {
    this._connection = dbConnection;
  }

  inserir(dadosJogo) {
    let dados = {
      operacao: 'inserir',
      dados: dadosJogo,
      collection: 'jogo',
      callback: (err, result) => {
        console.log('foi!');
      }
    };

    this._connection(dados);
  }
}

module.exports = () => JogoDao;