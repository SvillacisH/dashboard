import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>, arrResumen: Array<string>) {
    return arrLabels.map((label, index) => ({
        id: index,
        label: label,
        value1: arrValues1[index] + " °C",
        value2: arrValues2[index] + " Km/h",
        value3: arrResumen[index]
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'label',
        headerName: 'Hora',
        width: 125,
    },
    {
        field: 'value3',
        headerName: 'Dia',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 100,
        valueGetter: (_, row) => `${row.value3}`,
    },
    {
        field: 'value1',
        headerName: 'Temperatura',
        width: 125,
    },
    {
        field: 'value2',
        headerName: 'Velocidad del Viento',
        width: 125,
    },
];

interface TableUIProps {
    hora: string[];
    temperatura: number[];
    velocidad: number[];
    fecha: string[];
}

export default function TableUI(props: TableUIProps) {

    const rows = combineArrays(props.hora, props.temperatura, props.velocidad, props.fecha);

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