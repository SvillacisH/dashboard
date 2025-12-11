export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  weather_code: string
  wind_speed_10m: string
  rain: string
  wind_direction_10m: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
  rain: number
  wind_direction_10m: number
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  wind_speed_10m: string
  precipitation_probability: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  wind_speed_10m: number[]
  precipitation_probability: number[]
}
