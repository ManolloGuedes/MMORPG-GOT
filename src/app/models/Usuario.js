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

  static async buscarPorUsuario(usuario) { //static document method creation
    return await this.findOne(
      {
        _id: usuario._id
      }
    );
  }

  static async autenticar(usuario) {
    return this.findOne({
      usuario: usuario.usuario, 
      senha: usuario.senha
    });
  }

  async gerarDadosDeJogo() {
    this.dadosJogo = new dadosJogo.DadosJogoDao();
    await this.dadosJogo.gerarDados();
  }

  async criarUsuario() {
    try {
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
          nome: usuario.nome,
          senha: usuario.senha,
          dadosJogo: usuario.dadosJogo
        }
      )
    } catch(err) {
      console.log(err);
    }
  }
}

usuarioSchema.loadClass(Usuario);

let usuarioModel = mongoose.model('Usuario', usuarioSchema);

module.exports = {
  UsuarioDao: usuarioModel
}