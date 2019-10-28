const JogoController = require('../controllers/jogo');

module.exports = function(application){
	application.get('/jogo', function(req, res){
		JogoController.jogo(application, req, res);
	});

	application.get('/sair', function(req, res){
		JogoController.sair(application, req, res);
	});
}