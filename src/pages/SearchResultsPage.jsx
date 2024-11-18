import {Search} from "../components/MainPage/Search.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {useSearchParams} from "react-router-dom";
import {hotelListLoader} from "../loaders/hotelListLoader.jsx";
import HotelCard from "../components/MainPage/HotelCard.jsx";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link
} from "@mui/material";
import Carousel from "../components/MainPage/Carousel.jsx";

export default function SearchResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, ] = useSearchParams();
  const [hotelList, setHotelList] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list view
  const [sortOption, setSortOption] = useState('price'); // sorting by price or rating
  const [country, setCountry] = useState(null);


  useEffect(() => {
    if (searchParams) {
      setError(null);
      setIsLoading(true);
      const cityId = searchParams.get("cityId");
      const countryId = searchParams.get("countryId");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const guests = searchParams.get("guests");

      hotelListLoader({checkIn, checkOut, guests, cityId}).then((data) => {
        setHotelList(data);

        if (data.length > 0) {
          setCountry(data[0]?.address?.city?.country);
        }
        setIsLoading(false);
      }).catch((e) => {
        setError("No hotels found");
        setIsLoading(false);
      })
    }
  }, [searchParams]);
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // Implement sorting based on the selected option
    const sortedHotels = [...hotelList].sort((a, b) => {
      if (event.target.value === 'price') {
        return a.price - b.price;
      } else if (event.target.value === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
    setHotelList(sortedHotels);
  };

  const handleViewModeChange = (event) => {
    setViewMode(event.target.value);
  };

  if (error) {
    return (
      <>
        <Search top={"140px"}/>
        <Typography variant={"h1"} sx={{textAlign: 'center', mt: 10}}>{error}</Typography>

      </>)
  }

  return (
    <>
      <Search top={"140px"}/>

      {/* Breadcrumbs for navigation */}
      <Box sx={{mt: 10, mx: 23}}>
        <Breadcrumbs sx={{mt: 2}}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href={"/destination/" + country?.id}>
            {country ? country?.name : 'Destination'}
          </Link>
          <Typography color="text.primary">Hotels</Typography>
        </Breadcrumbs>

        {/* Displaying the number of hotels found */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2}}>
          <Typography variant="h6">{hotelList.length} Hotels found</Typography>

          {/* Sorting and View Toggle */}
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl sx={{mr: 2, minWidth: 120}}>
              <InputLabel>Sort By</InputLabel>
              <Select
                variant={"outlined"}
                value={sortOption}
                onChange={handleSortChange}
                label="Sort By"
                size="small"
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{mr: 2, minWidth: 120}}>
              <InputLabel>View</InputLabel>
              <Select
                variant={"outlined"}
                value={viewMode}
                onChange={handleViewModeChange}
                label="View"
                size="small"
              >
                <MenuItem value="grid">Grid</MenuItem>
                <MenuItem value="list">List</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Hotel Cards */}
        <Box sx={{display: 'flex', justifyContent: "center", mt: 2}}>
          {viewMode === "grid" &&
            <Carousel>
              {hotelList.map(hotel => (
                <HotelCard hotel={hotel} key={hotel.id}/>
              ))}
            </Carousel>}

          {viewMode !== "grid" && <Stack direction={"column"} spacing={2} sx={{overflow: "scroll"}}>
            {hotelList.map(hotel => (
              <HotelCard hotel={hotel} key={hotel.id}/>
            ))}
          </Stack>}
        </Box>

        {/* Loading indicator */}
        <Loading visible={isLoading}/>
      </Box>
    </>
  );
}