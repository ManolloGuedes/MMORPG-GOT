class DadosJogo {
  constructor(dadosJogo, usuario) {
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
    
    this._usuario = usuario
    this._moeda = dadosJogo.moeda;
    this._suditos = dadosJogo.suditos;
    this._temor = dadosJogo.temor;
    this._sabedoria = dadosJogo.sabedoria;
    this._comercio = dadosJogo.comercio;
    this._magia = dadosJogo.magia;
  }

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  get moeda() {
    return this._moeda;
  }
  
  set moeda(moeda) {
    this._moeda = moeda;
  }

  get suditos() {
    return this._suditos;
  }
  
  set suditos(suditos) {
    this._suditos = suditos;
  }

  get temor() {
    return this._temor;
  }
  
  set temor(temor) {
    this._temor = temor;
  }

  get sabedoria() {
    return this._sabedoria;
  }
  
  set sabedoria(sabedoria) {
    this._sabedoria = sabedoria;
  }

  get comercio() {
    return this._comercio;
  }
  
  set comercio(comercio) {
    this._comercio = comercio;
  }

  get magia() {
    return this._magia;
  }
  
  set magia(magia) {
    this._magia = magia;
  }

  get json() {
    return {
      usuario: this.usuario,
      moeda: this.moeda,
      suditos: this.suditos,
      temor: this.temor,
      sabedoria: this.sabedoria,
      comercio: this.comercio,
      magia: this.magia,
    };
  }
  
}

module.exports = () => DadosJogo;