const Usuario = require('../models/Usuario');

class CadastroController {
  static async cadastro (application, req, res) {
    res.render('cadastro', { validacao: {}, dadosForm: {} });
  }

  static async cadastrar (application, req, res) {
    let dadosForm = req.body;
  
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();
  
    let erros = req.validationErrors();
  
    if(erros) {
      res.render('cadastro', { validacao: erros, dadosForm: dadosForm })
      return;
    }
    
    let usuario = new Usuario.UsuarioDao(dadosForm);
    await usuario.gerarDadosDeJogo();
    
    try {
      await usuario.criarUsuario();
      req.session.autorizado = true;
      req.session.usuarioLogado = usuario
      res.redirect(307, '/autenticar');
    } catch(exception) {
      res.status(500).send(exception);
    }
  }
}

module.exports = CadastroController;