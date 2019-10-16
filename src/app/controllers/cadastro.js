module.exports.cadastro = (aplication, req, res) => {
  res.render('cadastro', { validacao: {}, dadosForm: {} });
}

module.exports.cadastrar = (aplication, req, res) => {
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

  res.render('cadastro');
}