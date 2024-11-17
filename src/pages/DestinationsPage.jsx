import {Box, Typography, useTheme} from "@mui/material";

export default function DestinationsPage() {
  const theme = useTheme();

  return(
    <>
    <Box sx={{
      textAlign: 'left',
      position: 'relative',
      overflow: 'hidden',
      // Add background image to the Box
      backgroundColor: theme.palette.primary.main,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: '#fff', // Adjust text color for readability
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        zIndex: -1, // Push overlay and background behind content
      },
    }}>

      <Typography sx={{ml: 23}} variant="h3" fontWeight="bold" gutterBottom>
        Destinations, adventures and memories.
      </Typography>
      <Typography sx={{paddingBottom: 5, ml: 23}} variant="h5" gutterBottom>
        Look for your next destination full of adventures and memories.
      </Typography>
    </Box>


    </>
  )
}