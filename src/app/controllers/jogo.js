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
  
    res.render('jogo', {nomecasa: req.session.casa});
  }
}

module.exports = JogoController;