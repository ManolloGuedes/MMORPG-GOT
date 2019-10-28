const Usuario = require('../models/Usuario');

class IndexController {
  static async autenticar (application, req, res) {
    let dadosForm = req.body;
  
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();
    
    let erros = req.validationErrors();
  
    if(erros) {
      res.render('index', {validacao: erros});
      return;
    }
  
    const UsuarioDao = Usuario.UsuarioDao;
  
    let usuario = await UsuarioDao.autenticar(dadosForm);
    if(usuario != undefined) {
      req.session.autorizado = true;
      req.session.usuario = usuario.nome;
      req.session.casa = usuario.casa;
    }

    if(req.session.autorizado) {
      res.redirect('jogo');
    } else {
      res.render('index', {validacao: {}});
    }
    
  }

  static async index (application, req, res) {
    res.render('index', {validacao:{}});
  }
}

module.exports = IndexController;