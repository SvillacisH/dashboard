import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';


export default function useFetchData(latitud: number | null, longitud: number | null){
    
    const [dataWeatherOuput, setData] = useState<OpenMeteoResponse | null>(null);
    const [loadingWeatherOutput, setLoading] = useState<boolean>(true);
    const [errorWeatherOutput, setError] = useState<string | null>(null);

    useEffect(() => {
        if (latitud == null || longitud == null) {
            setData(null);
            latitud = 0;
            longitud = 0;
            setLoading(false);
            return;
        }
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m,wind_speed_10m,precipitation_probability&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,rain,wind_direction_10m&timezone=America%2FChicago`;
        const fetchData = async () => {
            try {
                if ((latitud != 0 || longitud != 0)) {
                setLoading(true);
                }
                setError(null);

                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const json: OpenMeteoResponse = await response.json();
                setData(json);

            } catch (err: any) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [latitud, longitud]);    
    return { dataWeatherOuput, loadingWeatherOutput, errorWeatherOutput };
}
