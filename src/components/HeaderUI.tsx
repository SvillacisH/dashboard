import Typography from '@mui/material/Typography';

export default function HeaderUI() {
    return (
        <Typography
            variant="h2"
            component="h1"
            sx={{fontWeight: 'bold',  color: '#212121'}}>
            Dashboard del Clima
        </Typography>
    )
}