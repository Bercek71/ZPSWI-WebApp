import {useState, useEffect} from 'react';
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel, MenuItem, Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import CountryCard from "../components/MainPage/CountryCard.jsx";
import {useNavigate} from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Config from "../config.jsx";
import useCityLoader from "../loaders/useCityLoader.jsx";

export default function MainPage() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [cityId, setCityId] = useState('');

  const {cities} = useCityLoader();

  useEffect(() => {
    fetch(Config.webApiUrl + '/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleCountryClick = (country) => {

    navigate(`/hotels/${country.id}`);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box sx={{
        textAlign: 'center',
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

        <Typography sx={{paddingBottom: 5}} variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Country & Hotel Finder
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '30%', // Position halfway between the top and bottom
          left: '50%',
          transform: 'translate(-50%, -50%)', // Center on the screen
          backgroundColor: 'orange',
          padding: theme.spacing(1),
          borderRadius: '16px',
          boxShadow: theme.shadows[5],
          maxWidth: '80%',
          width: '60%',
          height: "auto",
          textAlign: 'center',
          zIndex: 1000, // Ensure it's above the background sections
          overflow: "visible",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <TextField
            id="check-in"
            label="Check-in Date"
            type="date"
            fullWidth
            InputLabelProps={{shrink: true}}
            sx={{mr: 2, color: "white", backgroundColor: "white"}}
            variant="outlined"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <TextField
            id="check-out"
            label="Check-out Date"
            type="date"
            fullWidth
            InputLabelProps={{shrink: true}}
            variant="outlined"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            sx={{mr: 2, color: "white", backgroundColor: "white"}}
          />
          <TextField
            id="guests"
            label="Number of Guests"
            type="number"
            fullWidth
            variant="outlined"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            sx={{mr: 2, color: "white", backgroundColor: "white"}}
            inputProps={{min: 1}}
          />
          <FormControl variant="outlined" sx={{mr: 2, minWidth: 120, color: "white", backgroundColor: "white"}}>
            <InputLabel id="city-select-label">City</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              label="City"
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton type="button" sx={{p: 1}}>
            <SearchIcon/>
          </IconButton>
        </Stack>

      </Box>

      <Container maxWidth="lg" sx={{mt: 4}}>


        {/*           <Box
                display="flex"
                backgroundColor="#e0e0e0"
                borderRadius="3px"
                sx={{ mb: 6 }}
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Enter Country Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="button" sx={{ p: 1 }} >
                <SearchIcon />
              </IconButton>
            </Box> */}


        <Typography variant="h4" fontWeight="bold" sx={{mb: 3, mt: 10}}>
          Featured Countries
        </Typography>

        <Grid container spacing={4}>
          {filteredCountries.map((country) => (
            <Grid item xs={12} sm={6} md={4} key={country.id}>
              <CountryCard country={country} onClick={() => handleCountryClick(country)}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
