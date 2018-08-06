export class ChartModel {
    id?: string
    empresa_id: string
    patente: string
    ruta: string
  
    constructor(id: string, empresa_id: string, patente: string, ruta: string) {
      this.id = id
      this.empresa_id = empresa_id
      this.patente = patente
      this.ruta = ruta
    }
  }

export default ChartModel;