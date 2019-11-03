const JogoController = require('../controllers/jogo');

module.exports = function(application){
	application.all('/jogo', function(req, res){
		JogoController.jogo(application, req, res);
	});

	application.get('/sair', function(req, res){
		JogoController.sair(application, req, res);
	});

	application.get('/suditos', function(req, res){
		JogoController.suditos(application, req, res);
	});

	application.get('/pergaminhos', function(req, res){
		JogoController.pergaminhos(application, req, res);
	});

	application.post('/ordenarAcoesSuditos', async function(req, res){
		try {
			await JogoController.ordenarAcoesSuditos(application, req, res);
		} catch(err) {
			return res.status(500).send(err);
		}
	});

	application.get('/revogarAcao', function(req, res) {
		JogoController.revogarAcao(application, req, res);
	});
}