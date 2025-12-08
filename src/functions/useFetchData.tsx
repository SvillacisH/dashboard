import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.19&longitude=-79.8875&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const [dataFetcherOutput, setData] = useState<OpenMeteoResponse | null>(null);
    const [loadingFetcherOutput, setLoading] = useState<boolean>(true);
    const [errorFetcherOutput, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []);

    return { dataFetcherOutput, loadingFetcherOutput, errorFetcherOutput };
}
