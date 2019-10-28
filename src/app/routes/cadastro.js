const CadastroController = require('../controllers/cadastro');

module.exports = function(application){
	application.get('/cadastro', function(req, res){
		CadastroController.cadastro(application, req, res);
	});

	application.post('/cadastrar', function(req, res){
		CadastroController.cadastrar(application, req, res);
	});
}