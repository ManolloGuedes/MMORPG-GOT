const Acao = require('../models/Acao'); 
const Usuario = require('../models/Usuario');

class JogoController {
  static async sair(application, req, res) {
    req.session.destroy((err) => {
      res.render('index', {validacao: {}});
    });
  }

  static async verificarAutenticacao(req, res) {
    if(req.session.autorizado !== true) {
      res.render('index', {validacao: [{msg: 'Por favor, realize o login'}]});
      return false;
    }

    return true;
  }

  static async jogo(application, req, res) {
    
    if(!JogoController.verificarAutenticacao(req, res)) {
      return;
    }
  
    let dadosResposta = {
      usuario: req.session.usuario,
      validacao: req.body && req.body.validacao ? req.body.validacao : {}
    };

    res.render('jogo', dadosResposta);
  }

  static async suditos(application, req, res) {
    if(!JogoController.verificarAutenticacao(req, res)) {
      return;
    }

    res.render('aldeoes', {validacao: {}});
  }

  static async pergaminhos(application, req, res) {
    if(!JogoController.verificarAutenticacao(req, res)) {
      return;
    }

    let usuario = new Usuario.UsuarioDao(req.session.usuario);
    let acoes = await Acao.AcaoDao.buscarAcoesPorUsuario(usuario);

    res.render('pergaminhos', {acoes});
  }

  static async ordenarAcoesSuditos(application, req, res) {
    if(!JogoController.verificarAutenticacao(req, res)) {
      return;
    }

    let dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    let erros = req.validationErrors();

    if(erros) {
      throw new Error(erros.msg);
    }

    let acao = new Acao.AcaoDao(dadosForm);

    let usuario = new Usuario.UsuarioDao(req.session.usuario);
    acao.criarRelacaoUsuario(usuario.id);

    await acao.configurarDataTermino();

    acao.save();

    res.send('Seus suditos realizarão a sua ordem.');

  }
}

module.exports = JogoController;