import { Card, CardContent, Typography } from "@mui/material";

interface WindDirectionUIProps {
  direccion: number;
}

function getWindDirectionLabel(grados: number): string {
  const grado = grados;

  const direcciones = [
    { label: "Norte (N)", min: 348.75, max: 11.25 },
    { label: "Norte-Noreste (NNE)", min: 11.25, max: 33.75 },
    { label: "Noreste (NE)", min: 33.75, max: 56.25 },
    { label: "Este-Noreste (ENE)", min: 56.25, max: 78.75 },
    { label: "Este (E)", min: 78.75, max: 101.25 },
    { label: "Este-Sureste (ESE)", min: 101.25, max: 123.75 },
    { label: "Sureste (SE)", min: 123.75, max: 146.25 },
    { label: "Sur-Sureste (SSE)", min: 146.25, max: 168.75 },
    { label: "Sur (S)", min: 168.75, max: 191.25 },
    { label: "Sur-Suroeste (SSO)", min: 191.25, max: 213.75 },
    { label: "Suroeste (SO)", min: 213.75, max: 236.25 },
    { label: "Oeste-Suroeste (OSO)", min: 236.25, max: 258.75 },
    { label: "Oeste (O)", min: 258.75, max: 281.25 },
    { label: "Oeste-Noroeste (ONO)", min: 281.25, max: 303.75 },
    { label: "Noroeste (NO)", min: 303.75, max: 326.25 },
    { label: "Norte-Noroeste (NNO)", min: 326.25, max: 348.75 },
  ];

  if (grado >= direcciones[0].min || grado < direcciones[0].max) {
    return direcciones[0].label;
  }

  for (let i = 1; i < direcciones.length; i++) {
        if (grado >= direcciones[i].min && grado < direcciones[i].max) {
            return direcciones[i].label;
        }
    }

    return "Dirección no definida"; // Esto no debería ocurrir si el rango es 0-360
}


export default function WindDirectionUI(prop: WindDirectionUIProps) {

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        padding: 2,
        backgroundColor: "#E3F2FD",
        border: "1px solid #90CAF9",
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      {/* 🛑 CAMBIO: Usamos un span con un emoji (ℹ️) en lugar del icono */}
      <span
        style={{
          fontSize: 35, // Simula el tamaño del icono
          color: "#1E88E5",
          marginTop: "3px",
          lineHeight: 1, // Ajusta la altura de línea para centrarlo mejor
        }}
      >
        ℹ️
      </span>

      <CardContent sx={{ padding: "0 !important" }}>
        <Typography variant="h6" sx={{ color: "#0D47A1", fontWeight: "bold" }}>
          {"Direccion del Viento"}
        </Typography>

        <Typography variant="body1" sx={{ color: "#0D47A1" }}>
          {getWindDirectionLabel(prop.direccion)}
        </Typography>
      </CardContent>
    </Card>
  );
}