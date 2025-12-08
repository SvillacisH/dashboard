import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';

function App() {

    const { dataFetcherOutput, loadingFetcherOutput, errorFetcherOutput } = useFetchData();

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
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

        </Grid>
    );
}


export default App;
