import { Box, TextField, Typography } from '@mui/material';

export default function FilterBar({ label, filterTerm, setFilterTerm }) {
    return (
        <Box sx={{ width: '20%', mr: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {label}
            </Typography>
            <TextField
                label="Enter Search Term"
                variant="outlined"
                fullWidth
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
            />
        </Box>
    );
}
