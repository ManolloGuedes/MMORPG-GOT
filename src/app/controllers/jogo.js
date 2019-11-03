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

    let moedas;

    switch(parseInt(acao.acao)) {
      case 1:
        moedas = 2 * acao.quantidade;
        break;
      case 2:
        moedas = 3 * acao.quantidade;
        break;
      case 3:
        moedas = 1 * acao.quantidade;
        break;
      case 4:
        moedas = 1 * acao.quantidade;
        break;
    }

    let usuario = await Usuario.UsuarioDao.buscarPorUsuario(req.session.usuario);
    
    await acao.criarRelacaoUsuario(usuario.id);
    
    let dadosJogo = await usuario.buscarDadosJogo();
    dadosJogo.moeda -= moedas;

    usuario.dadosJogo = dadosJogo;
    await Usuario.UsuarioDao.atualizar(usuario);
    
    await acao.configurarDataTermino();

    acao.save();

    res.send('Seus suditos realizarão a sua ordem.');

  }

  static async revogarAcao(application, req, res) {
    let query = req.query;
    let id = query ? query.id : null;
    
    if(id) {
      const acaoRevogada = await Acao.AcaoDao.revogarAcao(req.session.usuario, id);
      if(acaoRevogada) {
        res.redirect('jogo');
        return;
      }
    }
    res.send('Mestre, não foi possível revogar essa ação. Poderia tentar mais tarde?')
  }
}

module.exports = JogoController;