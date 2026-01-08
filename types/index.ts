export interface Modelo {
  id: string;
  nombre: string;
  edad: number;
  nacionalidad: string;
  altura: number;
  busto: number;
  cintura: number;
  cadera: number;
  fotos: string[];
  foto_principal: string;
  created_at: string;
  updated_at: string;
}

export interface ModeloFormData {
  nombre: string;
  edad: number;
  nacionalidad: string;
  altura: number;
  busto: number;
  cintura: number;
  cadera: number;
  fotos: File[];
}
