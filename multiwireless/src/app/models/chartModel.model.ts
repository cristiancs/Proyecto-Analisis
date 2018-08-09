export class ChartModel {
    horas: array
    velocidad: array
    crucero: array
    rpm: array
  
    constructor(id: array, empresa_id: array, patente: array, ruta: array) {
      this.id = id
      this.empresa_id = empresa_id
      this.patente = patente
      this.ruta = ruta
    }
  }

export default ChartModel;