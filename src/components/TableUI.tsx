import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrHoras: Array<string>, arrFechas: Array<string>, arrTemperaturas: Array<number>, arrVelocidad: Array<number>) {
    return arrHoras.map((horas, index) => ({
        id: index,
        horas: horas,
        fechas: arrFechas[index],
        temperaturas: arrTemperaturas[index] + " °C",
        velocidades: arrVelocidad[index] + " Km/h"
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'horas',
        headerName: 'Hora',
        width: 125,
    },
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
        field: 'temperaturas',
        headerName: 'Temperatura',
        width: 125,
    },
    {
        field: 'velocidades',
        headerName: 'Velocidad del Viento',
        width: 125,
    },
];

interface TableUIProps {
    hora: string[];
    fecha: string[];
    temperatura: number[];
    velocidad: number[];
}

export default function TableUI(props: TableUIProps) {

    const rows = combineArrays(props.hora, props.fecha, props.temperatura, props.velocidad);

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