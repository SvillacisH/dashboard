import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.22985, longitude: -78.52495 },
    'Manta': { latitude: -0.94937, longitude: -80.73137 },
    'Cuenca': { latitude: -2.8953, longitude: -78.9963 },
    'Salinas': { latitude: -2.223363, longitude: -80.958462 },
    'Puerto Lopez': { latitude: -1.559010, longitude: -80.810575 },
    'Puyo': { latitude: -1.48548, longitude: -77.99697 },
    'Vinces': { latitude: -1.55611, longitude: -79.75191 },
    'Samborondon': { latitude: -1.96276, longitude: -79.72402 },
    'Latacunga': { latitude: -0.934031, longitude: -78.614576 },
    'awe': { latitude: 0, longitude: 0 }
};

export default function useFetchData(selectedOption: string | null){
    
    const [dataFetcherOutput, setData] = useState<OpenMeteoResponse | null>(null);
    const [loadingFetcherOutput, setLoading] = useState<boolean>(true);
    const [errorFetcherOutput, setError] = useState<string | null>(null);

    useEffect(() => {
        const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["awe"];

        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m,precipitation_probability&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,rain,wind_direction_10m&timezone=America%2FChicago`;
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
