import { useEffect, useState } from 'react';
import { type ContinentResponse } from '../types/ContinentTypes';


export default function useLocationData(){
    
    const [dataLocationOutput, setData] = useState<ContinentResponse | null>(null);
    const [loadingLocationOutput, setLoading] = useState<boolean>(true);
    const [errorLocationOutput, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const URL = `https://raw.githubusercontent.com/SvillacisH/DAWM-Actividad1/refs/heads/main/Paises%26Ciudades.json`;
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const json: ContinentResponse = await response.json();
                setData(json);

            } catch (err: any) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { dataLocationOutput, loadingLocationOutput, errorLocationOutput };
}