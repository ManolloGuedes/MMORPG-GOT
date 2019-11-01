const db = require('../../config/dbConnection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acaoSchema = new Schema({
  usuario:        Schema.Types.ObjectId,
  acao:           Number,
  quantidade:     Number,
  dataTermino:    Date
}, {
  timestamps: { 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt' 
  } 
});

class Acao {
  get id() { //gets and sets will not become a document method
    return this._id;
  }

  criarRelacaoUsuario(id) {
    this.usuario = id;
  }

  get dataCriacao() {
    return this.createdAt;
  }

  get dataAlteracao() {
    return this.updatedAt;
  }

  async configurarDataTermino() {
    if(this.acao != null) {
      let data = new Date();
      switch(parseInt(this.acao)) {
        case 1:
          this.dataTermino = data.setTime(data.getTime() + (60*60*1000));
          break;
        case 2:
            this.dataTermino = data.setTime(data.getTime() + (2*60*60*1000));
          break;
        case 3:
        case 4:
            this.dataTermino =  data.setTime(data.getTime() + (5*60*60*1000));
          break;
      }
    }
  }

  async verificarAcaoTerminou() {
    return new Date().getTime() > this.dataTermino.getTime();
  }

  static async buscarAcoesPorUsuario(usuario, incluirFinalizadas = false) { //static document method creation
    let id = usuario.id.toString();
    
    let query = {
      usuario: mongoose.Types.ObjectId(id)
    };

    if(!incluirFinalizadas) {
      query.dataTermino = {
        $gt: new Date()
      }
    }

    return this.find(query).sort({dataTermino: 1});
  }
}

acaoSchema.loadClass(Acao);

let acaoModel = mongoose.model('Acao', acaoSchema);

module.exports = {
  AcaoDao: acaoModel
}