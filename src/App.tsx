import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {

    const { dataFetcherOutput, loadingFetcherOutput, errorFetcherOutput } = useFetchData();
    const horas = dataFetcherOutput?.hourly?.time
    ? dataFetcherOutput.hourly.time.map(t => t.split("T")[1])
    : [];
    const fechas = dataFetcherOutput?.hourly?.time
    ? dataFetcherOutput.hourly.time.map(t => t.split("T")[0])
    : [];
    return (
        <Grid container spacing={5} justifyContent="center" alignItems="center">

            {/* Encabezado */}
            <Grid size={12}> <HeaderUI /> </Grid>

            {/* Alertas */}
            <Grid size={12} container justifyContent="right" alignItems="center"> <AlertUI description="No se preveen lluvias" /> </Grid>

            {/* Selector */}
            <Grid size={{ xs: 12, md: 3 }} id='selector'><SelectorUI/></Grid>

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
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Temperatura Aparente'
                            description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    
                     {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Velocidad del Viento'
                            description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
                    }
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                     {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Humedad Relativa (2m)'
                            description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
                    }
                </Grid>

            </Grid>


            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>{dataFetcherOutput &&
                        (<ChartUI
                            fecha={horas.slice(0, 15)}
                            temperatura={dataFetcherOutput.hourly.temperature_2m.slice(0, 15)}
                            velocidad={dataFetcherOutput.hourly.wind_speed_10m.slice(0, 15)} />)
                    }</Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                {dataFetcherOutput &&
                        (<TableUI
                            hora={horas}
                            temperatura={dataFetcherOutput.hourly.temperature_2m}
                            velocidad={dataFetcherOutput.hourly.wind_speed_10m}
                            fecha={fechas} />)
                    }</Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

        </Grid>
    );
}


export default App;
