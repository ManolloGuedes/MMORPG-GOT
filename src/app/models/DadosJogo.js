const db = require('../../config/dbConnection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dadosJogoSchema = new Schema({
  moeda: Number,
  suditos: Number,
  temor: Number,
  sabedoria: Number,
  comercio: Number,
  magia: Number
});

class DadosJogo {
  get id() { //gets and sets will not become a document method
    return this._id;
  }

  gerarDados(dadosJogo) {
    if(!dadosJogo) {
      dadosJogo = {
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random()*1000),
        sabedoria: Math.floor(Math.random()*1000),
        comercio: Math.floor(Math.random()*1000),
        magia: Math.floor(Math.random()*1000),
      }
    } 
    
    this.moeda = dadosJogo.moeda;
    this.suditos = dadosJogo.suditos;
    this.temor = dadosJogo.temor;
    this.sabedoria = dadosJogo.sabedoria;
    this.comercio = dadosJogo.comercio;
    this.magia = dadosJogo.magia;
  }
}

dadosJogoSchema.loadClass(DadosJogo);

let dadosJogoModel = mongoose.model('DadosJogo', dadosJogoSchema);

module.exports = {
  DadosJogoDao: dadosJogoModel,
  Schema: dadosJogoSchema
}