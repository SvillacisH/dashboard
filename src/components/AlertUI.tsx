import Alert from '@mui/material/Alert';

type ClimaInfo = {
    name: string;
    severity: "success" | "info" | "warning" | "error";
};

const climas: Map<number, ClimaInfo> = new Map([
    // --- SUCCESS ---
    [0, { name: "Cielo despejado", severity: "success" }],
    [1, { name: "Mayormente despejado", severity: "success" }],

    // --- INFO ---
    [2, { name: "Parcialmente nublado", severity: "info" }],
    [3, { name: "Nublado", severity: "info" }],

    [45, { name: "Niebla", severity: "info" }],
    [48, { name: "Niebla con escarcha", severity: "info" }],

    [51, { name: "Llovizna ligera", severity: "info" }],
    [53, { name: "Llovizna moderada", severity: "info" }],

    [61, { name: "Lluvia ligera", severity: "info" }],

    [71, { name: "Nevada ligera", severity: "info" }],
    [77, { name: "Granitos de nieve", severity: "info" }],

    // --- WARNING ---
    [55, { name: "Llovizna densa", severity: "warning" }],

    [56, { name: "Llovizna helada ligera", severity: "warning" }],
    [57, { name: "Llovizna helada densa", severity: "warning" }],

    [63, { name: "Lluvia moderada", severity: "warning" }],
    [65, { name: "Lluvia fuerte", severity: "warning" }],

    [73, { name: "Nevada moderada", severity: "warning" }],
    [75, { name: "Nevada fuerte", severity: "warning" }],

    [80, { name: "Chubascos ligeros", severity: "warning" }],
    [81, { name: "Chubascos moderados", severity: "warning" }],
    [82, { name: "Chubascos violentos", severity: "warning" }],

    [85, { name: "Chubascos de nieve ligeros", severity: "warning" }],
    [95, { name: "Tormenta eléctrica", severity: "warning" }],

    // --- ERROR ---
    [67, { name: "Lluvia helada fuerte", severity: "error" }],
    [86, { name: "Chubascos de nieve fuertes", severity: "error" }],
    [96, { name: "Tormenta eléctrica con granizo ligero", severity: "error" }],
    [99, { name: "Tormenta eléctrica con granizo fuerte", severity: "error" }],
]);


interface AlertUIProps {
    clima?: number;
}

export default function AlertUI(prop: AlertUIProps) {
    const climaActual = climas.get(prop.clima ?? -1) || { name: "Desconocido", severity: "info" };
    return (
        <Alert variant="outlined" severity={climaActual.severity} sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.4rem",
            "& .MuiAlert-icon": {
                fontSize: "2.2rem"       // tamaño del ícono
            }
        }}>{climaActual.name}</Alert>
    )
}