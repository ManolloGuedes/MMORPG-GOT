module.exports.cadastro = (application, req, res) => {
  res.render('cadastro', { validacao: {}, dadosForm: {} });
}

module.exports.cadastrar = (application, req, res) => {
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

  let dbConnection = application.config.dbConnection;

  let usuarioDao = new application.app.models.UsuarioDao(dbConnection);
  usuarioDao.inserirUsuario(dadosForm);

  res.send('podemos cadastrar');
}