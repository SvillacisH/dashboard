import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';


interface ChartUIProps {
   fecha?: string[];
   temperatura?: number[];
   velocidad?: number[];
   precipitacion?: number[];
}

export default function ChartUI(props: ChartUIProps) {
   const datesAsObjects = useMemo(() => {
      return (props.fecha || []).map(f => new Date(f));
   }, [props.fecha]);

   const dayMonthFormatter = new Intl.DateTimeFormat('es-ES', { 
        weekday: 'short', 
        day: '2-digit',   
    }).format;

    const timeFormatter = useMemo(() => {
        return new Intl.DateTimeFormat('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }).format;
    }, []);

    const getTooltipLabel = (dataIndex: number, value: number | null | undefined, unit: string) => {
    if (value === null || value === undefined) return '';

    const date = datesAsObjects[dataIndex]; 

    if (date instanceof Date) {
        const time = timeFormatter(date); 
        
        return `${time} | ${value} ${unit}`;
    }
    return `${value} ${unit}`; 
};

    const capitalize = (s: string) => {
      if (!s) return s;
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

   return (
      <>
         <Typography variant="h6" component="div"  sx={{ color: "#212121" }} >
            Temperatura | Velocidad del Viento | Probabilidad de Precipitacion
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.temperatura, 
                  label: 'Temperatura(2m)', 
                  color: '#29B6F6', 
                  valueFormatter: (value, context) => getTooltipLabel(context.dataIndex, value, '°C')},

               { data: props.velocidad, 
                  label: 'Velocidad del Viento(10m)', 
                  color: '#5E35B1', 
                  valueFormatter: (value, context) => getTooltipLabel(context.dataIndex, value, 'Km/h') },

               { data: props.precipitacion, 
                  label: 'Probabilidad de Precipitacion', 
                  color: '#35b164ff', 
                  valueFormatter: (value, context) => getTooltipLabel(context.dataIndex, value, '%') },
            ]}
            xAxis={[{ scaleType: 'time', data: datesAsObjects,valueFormatter: (date) => {
               if (!date) return '';
               const formattedDate = dayMonthFormatter(date);
               return capitalize(formattedDate.replace('.', ''));
            }
            }]}
            sx={{
               "& .MuiMarkElement-root": {
                  display: "none",   
               }
            }}
         />
      </>
   );
}