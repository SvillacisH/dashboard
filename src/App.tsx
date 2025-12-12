import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useWeatherData';
import useLocationData from './functions/useLocationData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import ImagesUI from './components/ImagesUI';
import { useState } from 'react';
import WindDirectionUI from './components/WindDirectionUI';
import { type ContinentKey } from './types/ContinentTypes';
import Typography from '@mui/material/Typography';


function App() {

    const [continente, setContinente] = useState<ContinentKey | "">("");
    const [pais, setPais] = useState<string>("");
    const [ciudad, setCiudad] = useState<string>("");
    const [latitud, setLatitud] = useState<number | null>(null);
    const [longitud, setLongitud] = useState<number | null>(null);

    const { dataWeatherOuput, loadingWeatherOutput, errorWeatherOutput } = useFetchData(latitud, longitud);
    const { dataLocationOutput } = useLocationData();


    const horas = dataWeatherOuput?.hourly?.time
        ? dataWeatherOuput.hourly.time.map(t => t.split("T")[1])
        : [];
    const fechas = dataWeatherOuput?.hourly?.time
        ? dataWeatherOuput.hourly.time.map(t => t.split("T")[0])
        : [];

    const climaCode = dataWeatherOuput?.current?.weather_code;

    const continentes: ContinentKey[] = dataLocationOutput
        ? (Object.keys(dataLocationOutput) as ContinentKey[])
        : [];

    const paises =
        continente && dataLocationOutput
            ? dataLocationOutput[continente].map((p) => p.pais)
            : [];

    let ciudades: string[] = [];
    if (continente && pais && dataLocationOutput) {
        const paisObj = dataLocationOutput[continente].find((p) => p.pais === pais);
        ciudades = paisObj
            ? paisObj.ciudades_mas_pobladas.map((c) => c.nombre)
            : [];
    }

    const displayCity = ciudad
        ? (
            <>
                Información del clima para:{" "}
                <strong style={{ fontWeight: 'bold' }}>{ciudad}</strong>
            </>
        )
        : "Selecciona una Ubicación";

    return (
        <Grid container spacing={5} justifyContent="center" alignItems="center">

            {/* Encabezado */}
            <Grid size={12} container alignItems="center">
                <Grid size={3}>
                    <ImagesUI url={"src/assets/Espol_Logo.png"} />
                </Grid>
                <Grid size={6} style={{ textAlign: 'center' }}>
                    <HeaderUI />
                </Grid>

                <Grid size={3}>
                    <ImagesUI url={"src/assets/Weather_Anim.gif"} />
                </Grid>
            </Grid>

            {/* Indicador de seleccion de ciudad */}
            <Grid size={12} container alignItems="center" justifyContent="center" >
                <Typography variant="h4">{displayCity}</Typography>
            </Grid>

            {/* Selectores */}
            <Grid size={12} id='selector' container>
                <Grid size={4}>
                    <SelectorUI
                        label="Continente"
                        options={continentes}
                        onOptionSelect={(value) => {
                            setContinente(value as ContinentKey);
                            setPais("");
                            setCiudad("");
                            setLatitud(null);
                            setLongitud(null);
                        }}
                        resetTrigger={null}
                    />

                </Grid>

                <Grid size={4}>
                    <SelectorUI
                        label="País"
                        options={paises}
                        onOptionSelect={(value) => {
                            setPais(value);
                            setCiudad("");
                            setLatitud(null);
                            setLongitud(null);
                        }}
                        disabled={!continente}
                        resetTrigger={continente}
                    />
                </Grid>

                <Grid size={4}>
                    <SelectorUI
                        label="Ciudad"
                        options={ciudades}
                        onOptionSelect={(value) => {

                            setCiudad(value);

                            if (continente && pais && dataLocationOutput) {
                                const paisObj = dataLocationOutput[continente].find(p => p.pais === pais);

                                const ciudadObj = paisObj?.ciudades_mas_pobladas.find(c => c.nombre === value);

                                setLatitud(ciudadObj?.latitud ?? null);
                                setLongitud(ciudadObj?.longitud ?? null);
                            }
                        }}
                        disabled={!pais}
                        resetTrigger={pais}
                    />
                </Grid>

            </Grid>


            {/* Indicadores */}
            <Grid container size={12} >

                {loadingWeatherOutput &&

                    (
                        <Grid size={12} style={{ textAlign: "center" }}>
                            <p>Cargando datos del clima...</p>
                        </Grid>
                    )}

                {errorWeatherOutput && (
                    <Grid size={12} style={{ textAlign: "center", color: "red" }}>
                        <p>Error al cargar los datos: {errorWeatherOutput}</p>
                    </Grid>
                )}

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI
                        title="Temperatura (2m)"
                        description={
                            dataWeatherOuput
                                ? dataWeatherOuput.latitude === 0 && dataWeatherOuput.longitude === 0
                                    ? "--"
                                    : dataWeatherOuput.current.temperature_2m
                                : "--"
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI
                        title="Temperatura Aparente"
                        description={
                            dataWeatherOuput
                                ? dataWeatherOuput.latitude === 0 && dataWeatherOuput.longitude === 0
                                    ? "--"
                                    : dataWeatherOuput.current.apparent_temperature
                                : "--"
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <IndicatorUI
                        title="Velocidad del Viento (10m)"
                        description={
                            dataWeatherOuput
                                ? dataWeatherOuput.latitude === 0 && dataWeatherOuput.longitude === 0
                                    ? "--"
                                    : dataWeatherOuput.current.wind_speed_10m
                                : "--"
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <IndicatorUI
                        title="Humedad Relativa (2m)"
                        description={
                            dataWeatherOuput
                                ? dataWeatherOuput.latitude === 0 && dataWeatherOuput.longitude === 0
                                    ? "--"
                                    : dataWeatherOuput.current.relative_humidity_2m
                                : "--"
                        }
                    />
                </Grid>

            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                {dataWeatherOuput &&
                    dataWeatherOuput.latitude !== 0 &&
                    dataWeatherOuput.longitude !== 0 &&
                    (<ChartUI
                        fecha={dataWeatherOuput.hourly.time}
                        temperatura={dataWeatherOuput.hourly.temperature_2m}
                        velocidad={dataWeatherOuput.hourly.wind_speed_10m}
                        precipitacion={dataWeatherOuput.hourly.precipitation_probability} />)
                }</Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                {dataWeatherOuput &&
                    dataWeatherOuput.latitude !== 0 &&
                    dataWeatherOuput.longitude !== 0 &&
                    (<TableUI
                        hora={horas}
                        fecha={fechas}
                        temperatura={dataWeatherOuput.hourly.temperature_2m}
                        velocidad={dataWeatherOuput.hourly.wind_speed_10m}
                        probabilidad={dataWeatherOuput.hourly.precipitation_probability} />)
                }</Grid>


            {/* Alertas */}
            <Grid size={12} container justifyContent="center">
                {dataWeatherOuput &&
                    dataWeatherOuput.latitude !== 0 &&
                    dataWeatherOuput.longitude !== 0 &&
                    <Grid size={{ xs: 12, md: 6 }}>
                        <AlertUI clima={climaCode} />
                    </Grid>


                }
                {dataWeatherOuput &&
                    dataWeatherOuput.latitude !== 0 &&
                    dataWeatherOuput.longitude !== 0 &&
                    <Grid size={{ xs: 12, md: 6 }}>
                        <WindDirectionUI direccion={dataWeatherOuput.current.wind_direction_10m} />
                    </Grid>
                }
            </Grid>
        </Grid >
    );
}


export default App;
