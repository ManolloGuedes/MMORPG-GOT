/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(global.gConfig.node_port, () => {
	console.log('Servidor online');
});