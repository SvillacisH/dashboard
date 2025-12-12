export interface ContinentResponse {
  "America del Norte": continente[]
  "America Central": continente[]
  "America del Sur": continente[]
  "Europa": continente[]
  "Asia": continente[]
  "África": continente[]
  "Oceanía": continente[]
}

export interface continente {
  pais: string
  codigo_iso: string
  ciudades_mas_pobladas: CiudadesMasPoblada[]
}

export interface CiudadesMasPoblada {
  nombre: string
  poblacion_estimada: number
  latitud: number
  longitud: number
}

export type ContinentKey = keyof ContinentResponse;