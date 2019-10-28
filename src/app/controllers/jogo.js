class JogoController {
  static async sair(application, req, res) {
    req.session.destroy((err) => {
      res.render('index', {validacao: {}});
    });
  }

  static async jogo(application, req, res) {
    if(req.session.autorizado !== true) {
      res.render('index', {validacao: [{msg: 'Por favor, realize o login'}]});
    } 
  
    res.render('jogo', {usuario: req.session.usuario});
  }

  static async suditos(application, req, res) {
    res.render('aldeoes', {validacao: {}});
  }

  static async pergaminhos(application, req, res) {
    res.render('pergaminhos', {validacao: {}});
  }
}

module.exports = JogoController;