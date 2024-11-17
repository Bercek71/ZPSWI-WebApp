import {Search} from "../components/MainPage/Search.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {useSearchParams} from "react-router-dom";
import {hotelListLoader} from "../loaders/hotelListLoader.jsx";
import HotelCard from "../components/MainPage/HotelCard.jsx";
import {Box, Grid, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Breadcrumbs, Link} from "@mui/material";
import Carousel from "../components/MainPage/Carousel.jsx";

export default function SearchResultsPage() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [cityId, setCityId] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [defaultCityId, setDefaultCityId] = useState(parseInt(searchParams.get("cityId")));
  const [defaultCountryId, setDefaultCountryId] = useState(parseInt(searchParams.get("countryId")));
  const [hotelList, setHotelList] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list view
  const [sortOption, setSortOption] = useState('price'); // sorting by price or rating
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if(searchParams){
      setCheckIn(searchParams.get("checkIn"));
      setCheckOut(searchParams.get("checkOut"));
      setGuests(searchParams.get("guests"));
      setCityId(searchParams.get("cityId"));
      setCountryId(searchParams.get("countryId"));
    }

  }, [searchParams]);

  useEffect(() => {
    if(searchParams){
      setIsLoading(true);
      const cityId = searchParams.get("cityId");
      const countryId = searchParams.get("countryId");
      const checkIn = searchParams.get("checkIn");
      const checkOut = searchParams.get("checkOut");
      const guests = searchParams.get("guests");

      hotelListLoader({checkIn, checkOut, guests, cityId}).then((data) => {
        setHotelList(data);
        if(data.length > 0) {
          console.log(data[0]?.address?.city?.country);
          setCountry(data[0]?.address?.city?.country);
        }
        setIsLoading(false);
      })
    }
  }, [searchParams]);
  console.log(country)
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

  return (
    <>
      <Search
        top={"16%"}
        onChange={(e, value) => {
          if (value?.type === "city") {
            setCityId(value?.id);
            setCountryId(countryId);
          } else {
            setCityId(null);
            setCountryId(value?.id);
          }
        }}
        defaultCityId={defaultCityId} defaultCountryId={defaultCountryId}
        cityId={cityId} countryId={countryId}
        checkInValue={checkIn} onCheckinChange={(e) => setCheckIn(e.target.value)} checkOutValue={checkOut}
        onCheckOutChange={(e) => setCheckOut(e.target.value)} guestsValue={guests}
        onGuestsChange={(e) => e.target.value > 0 ? setGuests(e.target.value) : null}/>

      {/* Breadcrumbs for navigation */}
      <Box sx={{mt: 10, mx: 4}}>
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

        {viewMode !== "grid" && <Stack direction={"column"} spacing={2}>
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