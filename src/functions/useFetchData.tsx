import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.22985, longitude: -78.52495 },
    'Manta': { latitude: -0.94937, longitude: -80.73137 },
    'Cuenca': { latitude: -2.8953, longitude: -78.9963 },
};

export default function useFetchData(selectedOption: string | null){
    
    const [dataFetcherOutput, setData] = useState<OpenMeteoResponse | null>(null);
    const [loadingFetcherOutput, setLoading] = useState<boolean>(true);
    const [errorFetcherOutput, setError] = useState<string | null>(null);

    useEffect(() => {
        const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];

        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;
        const fetchData = async () => {
            try {
                setLoading(true);
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
    }, [selectedOption]);

    return { dataFetcherOutput, loadingFetcherOutput, errorFetcherOutput };
}
