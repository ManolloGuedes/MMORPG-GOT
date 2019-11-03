const crypto = require('crypto')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const db = require('../../config/dbConnection');

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

  static async buscarPorUsuario(usuario) { //static document method creation
    return await this.findOne(
      {
        _id: usuario._id
      }
    );
  }

  static async autenticar(usuario) {
    let senhaCriptografada = criptografarDado(usuario.senha);
    return this.findOne({
      usuario: usuario.usuario, 
      senha: senhaCriptografada
    });
  }

  async gerarDadosDeJogo() {
    this.dadosJogo = new dadosJogo.DadosJogoDao();
    await this.dadosJogo.gerarDados();
  }

  async criarUsuario() {
    try {
      let senhaCriptografada = criptografarDado(this.senha);
      this.senha = senhaCriptografada;
      return await this.save();
    } catch(exception) {
      return exception;
    }
  }

  async buscarDadosJogo() {
    return this.dadosJogo;
  }

  static async atualizar(usuario) {
    try{
      
      await this.updateOne(
        {
          _id: usuario.id
        }, {
          dadosJogo: usuario.dadosJogo
        }
      )
    } catch(err) {
      console.log(err);
    }
  }
}

function criptografarDado(dado) {
  return crypto.createHash('md5').update(dado).digest('hex');
}

usuarioSchema.loadClass(Usuario);

let usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  UsuarioDao: usuarioModel
}