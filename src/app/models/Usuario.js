const db = require('../../config/dbConnection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dadosJogo = require('./DadosJogo')

const usuarioSchema = new Schema({
  nome:       String,
  usuario:    String,
  senha:      String,
  casa:       String,
  dadosJogo:  dadosJogo.Schema
});

class Usuario {
  get id() { //gets and sets will not become a document method
    return this._id;
  }

  static buscarPorUsuario(usuario) { //static document method creation
    return this.findOne({usuario});
  }

  static autenticar(usuario, req, res) {
    this.find({
      usuario: usuario.usuario, 
      senha: usuario.senha
    }, (err, result) => {
      if(result && result[0] != undefined) {
        req.session.autorizado = true;
        req.session.usuario = result[0].nome;
        req.session.casa = result[0].casa;
      }

      if(req.session.autorizado) {
        res.redirect('jogo');
      } else {
        res.render('index', {validacao: {}});
      }
    })
  }
}

usuarioSchema.loadClass(Usuario);

let usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  UsuarioDao: usuarioModel
}