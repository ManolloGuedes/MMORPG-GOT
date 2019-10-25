/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-validator */
var expressSession = require('express-session');

/* importar o módulo dotenv para acesso a variáveis de ambiente */
const dotenv = require('dotenv');
dotenv.config();

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-session */
app.use(expressSession(
	{
		secret: process.env.COOKIE_SECRET, /* ID de referência para acessar as variáveis de sessão criadas no servidor */
		resave: false, /* faz com que a sessão seja regravada no servidor, mesmo não tendo modificaçoes */
		saveUninitialized: false /* cria uma sessão nova sempre que houver modificações na sessão */
	}
));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;