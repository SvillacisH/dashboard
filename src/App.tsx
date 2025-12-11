import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import ImagesUI from './components/ImagesUI';
import { useState } from 'react';
import WindDirectionUI from './components/Information/WindDirectionUI';

function App() {


    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { dataFetcherOutput, loadingFetcherOutput, errorFetcherOutput } = useFetchData(selectedOption);

    const horas = dataFetcherOutput?.hourly?.time
        ? dataFetcherOutput.hourly.time.map(t => t.split("T")[1])
        : [];
    const fechas = dataFetcherOutput?.hourly?.time
        ? dataFetcherOutput.hourly.time.map(t => t.split("T")[0])
        : [];

    const climaCode = dataFetcherOutput?.current?.weather_code;


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

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }} id='selector'><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

            {/* Indicadores */}
            <Grid container size={{ xs: 12, md: 9 }} >

                {loadingFetcherOutput && (
                    <Grid size={12} style={{ textAlign: "center" }}>
                        <p>Cargando datos del clima...</p>
                    </Grid>
                )}

                {errorFetcherOutput && (
                    <Grid size={12} style={{ textAlign: "center", color: "red" }}>
                        <p>Error al cargar los datos: {errorFetcherOutput}</p>
                    </Grid>
                )}

                <Grid size={{ xs: 12, md: 3 }}>
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude !== 0 &&
                        dataFetcherOutput.longitude !== 0 &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
                    }
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude == 0 &&
                        dataFetcherOutput.longitude == 0 &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description='--' />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude !== 0 &&
                        dataFetcherOutput.longitude !== 0 &&
                        (<IndicatorUI
                            title='Temperatura Aparente'
                            description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
                    }
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude == 0 &&
                        dataFetcherOutput.longitude == 0 &&
                        (<IndicatorUI
                            title='Temperatura Aparente'
                            description='--' />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude !== 0 &&
                        dataFetcherOutput.longitude !== 0 &&
                        (<IndicatorUI
                            title='Velocidad del Viento'
                            description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
                    }
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude == 0 &&
                        dataFetcherOutput.longitude == 0 &&
                        (<IndicatorUI
                            title='Velocidad del Viento'
                            description='--' />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude !== 0 &&
                        dataFetcherOutput.longitude !== 0 &&
                        (<IndicatorUI
                            title='Humedad Relativa (2m)'
                            description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
                    }
                    {dataFetcherOutput &&
                        dataFetcherOutput.latitude == 0 &&
                        dataFetcherOutput.longitude == 0 &&
                        (<IndicatorUI
                            title='Humedad Relativa (2m)'
                            description='--' />)
                    }
                </Grid>

            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                {dataFetcherOutput &&
                    dataFetcherOutput.latitude !== 0 &&
                    dataFetcherOutput.longitude !== 0 &&
                    (<ChartUI
                        fecha={horas.slice(0, 15)}
                        temperatura={dataFetcherOutput.hourly.temperature_2m.slice(0, 15)}
                        velocidad={dataFetcherOutput.hourly.wind_speed_10m.slice(0, 15)}
                        precipitacion={dataFetcherOutput.hourly.precipitation_probability.slice(0, 15)} />)
                }</Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                {dataFetcherOutput &&
                    dataFetcherOutput.latitude !== 0 &&
                    dataFetcherOutput.longitude !== 0 &&
                    (<TableUI
                        hora={horas}
                        fecha={fechas}
                        temperatura={dataFetcherOutput.hourly.temperature_2m}
                        velocidad={dataFetcherOutput.hourly.wind_speed_10m}
                        probabilidad={dataFetcherOutput.hourly.precipitation_probability} />)
                }</Grid>

            {/* Alertas */}
            <Grid size={12} container justifyContent="center">
                {dataFetcherOutput &&
                    dataFetcherOutput.latitude !== 0 &&
                    dataFetcherOutput.longitude !== 0 &&
                    <AlertUI clima={climaCode} />
                }
            </Grid>

{dataFetcherOutput &&
                    dataFetcherOutput.latitude !== 0 &&
                    dataFetcherOutput.longitude !== 0 &&
            <Grid size={{ xs: 12, md: 12 }} container >
        
                <Grid size={{ xs: 12, md: 3 }}>
                    <WindDirectionUI direccion={dataFetcherOutput.current.wind_direction_10m}/>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                </Grid>

                <Grid size={{ xs: 12, md: 2.75 }}>
                </Grid>
                
            </Grid> 
}
        </Grid>
    );
}


export default App;
