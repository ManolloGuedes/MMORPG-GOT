const IndexController = require('../controllers/index');

module.exports = function(application){
	application.get('/', function(req, res){
		IndexController.index(application, req, res)
	});

	application.post('/autenticar', function(req, res){
		IndexController.autenticar(application, req, res)
	});
}