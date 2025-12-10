import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';



interface ChartUIProps {
   fecha?: string[];
   temperatura?: number[];
   velocidad?: number[];
}

export default function ChartUI(props: ChartUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Velocidad del Viento
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.temperatura, label: 'Temperatura(2m)', color: '#29B6F6' },
               { data: props.velocidad, label: 'Velocidad del Viento(10m)', color: '#5E35B1' },
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