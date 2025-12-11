import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';



interface ChartUIProps {
   fecha?: string[];
   temperatura?: number[];
   velocidad?: number[];
   precipitacion?: number[];
}

export default function ChartUI(props: ChartUIProps) {
   return (
      <>
         <Typography variant="h6" component="div"  sx={{ color: "#212121" }} >
            Temperatura | Velocidad del Viento | Probabilidad de Precipitacion
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.temperatura, label: 'Temperatura(2m)', color: '#29B6F6', valueFormatter: (value) => `${value} °C` },
               { data: props.velocidad, label: 'Velocidad del Viento(10m)', color: '#5E35B1', valueFormatter: (value) => `${value} Km/h` },
               { data: props.precipitacion, label: 'Probabilidad de Precipitacion', color: '#35b164ff', valueFormatter: (value) => `${value} %` },
            ]}
            xAxis={[{ scaleType: 'point', data: props.fecha }]}
            sx={{
               "& .MuiMarkElement-root": {
                  r: 3,           // tamaño de los puntos
                  strokeWidth: 2, // borde
                  fill: "#fff",   // relleno
               }
            }}
         />
      </>
   );
}