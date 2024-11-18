import {useEffect, useState} from 'react';
import {Box, Container, Typography, useTheme} from '@mui/material';
import {Search} from "../components/MainPage/Search.jsx";
import LastSearchResultCard from "../components/MainPage/LastSearchResultCard.jsx";
import Carousel from "../components/MainPage/Carousel.jsx";
import CountryCard from "../components/MainPage/CountryCard.jsx";

export default function MainPage() {
  const theme = useTheme();
  const [lastSearchResults, setLastSearchResults] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("lastSearchResults")){
      const lastSearchResultsString = localStorage.getItem("lastSearchResults");
      try {
        const lastSearchResults = JSON.parse(lastSearchResultsString);
        setLastSearchResults(lastSearchResults);

      } catch (e) {
        localStorage.removeItem("lastSearchResults");
      }
    }
  }, []);


  return (
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
          Welcome to Country & Hotel Finder
        </Typography>
        <Typography sx={{paddingBottom: 5, ml: 23}} variant="h5" gutterBottom>
          Find your next hotel, destination and adventure...
        </Typography>
      </Box>
      <Search  top={"285px"}/>

      <Container maxWidth="lg" sx={{mt: 4}}>

        {lastSearchResults?.length > 0 &&
          <>
          <Typography variant="h6" fontWeight="bold" sx={{mb: 1, mt: 10}}>
          Your last search
        </Typography>
            <Carousel>
                {lastSearchResults.map((result, index) => (
                  <LastSearchResultCard key={index} searchResult={result} />
                ))}
            </Carousel>
          </>
      }

      <Typography variant={"h5"} fontWeight={"bold"} sx={{mt: 10, mb: 3}}>
        Popular Destinations
      </Typography>
        {/* Add tiles of countries and cities large grid like on booking site*/}
      <Carousel>
        <CountryCard country={{id: 1, name: "Turkey", isoCode: "CZE"}} />

      </Carousel>


      </Container>

    </>
  );
}
