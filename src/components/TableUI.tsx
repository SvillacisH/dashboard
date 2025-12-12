import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const COLORS = {
    LOW: '#4CAF50',
    MEDIUM: '#FFEB3B',
    HIGH: '#F44336',
    DEFAULT: '#FFFFFF',
};

function getColorByValue(value: number, metricType: 'temp' | 'vel' | 'prob') {
    switch (metricType) {
        case 'temp':
            if (value > 30) return COLORS.HIGH;
            if (value > 20) return COLORS.MEDIUM;
            return COLORS.LOW;
        case 'vel':
            if (value > 30) return COLORS.HIGH;
            if (value > 15) return COLORS.MEDIUM;
            return COLORS.LOW;
        case 'prob':
            if (value > 60) return COLORS.HIGH;
            if (value > 30) return COLORS.MEDIUM;
            return COLORS.LOW;
        default:
            return COLORS.DEFAULT;
    }
}

function combineArrays(arrHoras: Array<string>, arrFechas: Array<string>, arrTemperaturas: Array<number>, arrVelocidad: Array<number>, arrProbabilidad: Array<number>) {
    return arrHoras.map((horas, index) => ({
        id: index,
        horas: horas,
        fechas: arrFechas[index],

        temperaturaValue: arrTemperaturas[index],
        velocidadValue: arrVelocidad[index],
        probabilidadValue: arrProbabilidad[index],

        temperaturas: arrTemperaturas[index] + " °C",
        velocidades: arrVelocidad[index] + " Km/h",
        probabilidades: arrProbabilidad[index] + " %"

    }));
}

const columns: GridColDef[] = [
    {
        field: 'fechas',
        headerName: 'Dia',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.fechas}`,
    },
    {
        field: 'horas',
        headerName: 'Hora',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 65,
    },
    {
         field: 'temperaturas',
        headerName: 'Temperatura',
        width: 145,
        sortable: true,
        valueGetter: (_, row) => row.temperaturaValue,
        renderCell: (params) => {
            const value = params.row.temperaturaValue;
            const color = getColorByValue(value, 'temp');

            return (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: color,
                        color: color === COLORS.MEDIUM ? '#333' : '#FFF',
                        fontWeight: 'bold',
                    }}
                >
                    {params.row.temperaturas}
                </Box>
            );
        },
    },
    {
        field: 'velocidades',
        headerName: 'Velocidad del Viento',
        width: 145,
        sortable: true,
        valueGetter: (_, row) => row.velocidadValue,
        renderCell: (params) => {
            const value = params.row.velocidadValue;
            const color = getColorByValue(value, 'vel');

            return (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: color,
                        color: color === COLORS.MEDIUM ? '#333' : '#FFF',
                        fontWeight: 'bold',
                    }}
                >
                    {params.row.velocidades}
                </Box>
            );
        },
    },
    {
        field: 'probabilidades',
        headerName: 'Probabilidad de Precipitación',
        width: 145,
        sortable: true,
        valueGetter: (_, row) => row.probabilidadValue,
        renderCell: (params) => {
            const value = params.row.probabilidadValue;
            const color = getColorByValue(value, 'prob');

            return (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: color,
                        color: color === COLORS.MEDIUM ? '#333' : '#FFF',
                        fontWeight: 'bold',
                    }}
                >
                    {params.row.probabilidades}
                </Box>
            );
        },
    },
];

interface TableUIProps {
    hora: string[];
    fecha: string[];
    temperatura: number[];
    velocidad: number[];
    probabilidad: number[];
}

export default function TableUI(props: TableUIProps) {

    const rows = combineArrays(props.hora, props.fecha, props.temperatura, props.velocidad, props.probabilidad);

    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}