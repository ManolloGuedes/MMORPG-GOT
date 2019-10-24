/* importar as configurações do servidor */
const application = require('./config/server');

const dotenv = require('dotenv');
dotenv.config();

/* parametrizar a porta de escuta */
application.listen(process.env.NODE_PORT, () => {
	console.log(`Server is connected and using ${process.env.NODE_PORT} as application port`);
});