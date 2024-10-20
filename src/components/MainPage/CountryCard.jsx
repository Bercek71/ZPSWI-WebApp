import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';

export default function CountryCard({ country, onClick }) {

    const flagUrl = `https://flagcdn.com/w320/${country.isoCode.toLowerCase()}.jpg`;

    return (
        <Card>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <img
                            src={flagUrl}
                            alt={`${country.name} flag`}
                            style={{ width: '100%', height: 'auto', maxHeight: '100px' }}
                        />
                    </Box>
                    <Typography variant="h5" component="div">
                        {country.name}
                    </Typography>
                    <Typography color="textSecondary">
                        ISO Code: {country.isoCode}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
