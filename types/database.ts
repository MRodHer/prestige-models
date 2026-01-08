export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      modelos: {
        Row: {
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
        };
        Insert: {
          id?: string;
          nombre: string;
          edad: number;
          nacionalidad: string;
          altura: number;
          busto: number;
          cintura: number;
          cadera: number;
          fotos: string[];
          foto_principal: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          edad?: number;
          nacionalidad?: string;
          altura?: number;
          busto?: number;
          cintura?: number;
          cadera?: number;
          fotos?: string[];
          foto_principal?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
