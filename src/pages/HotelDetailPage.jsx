import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Search} from "../components/MainPage/Search.jsx";
import {Box, Card, CardContent, CardMedia, Divider, Grid, Paper, Typography} from "@mui/material";
import Loading from "../components/Loading.jsx";
import Config from "../config.jsx";

export default  function HotelDetailPage(){
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
  const {hotelId} = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    if(searchParams){
      setCheckIn(searchParams.get("checkIn"));
      setCheckOut(searchParams.get("checkOut"));
      setGuests(searchParams.get("guests"));
      setCityId(searchParams.get("cityId"));
      setCountryId(searchParams.get("countryId"));
    }

  }, [searchParams]);


  const loadHotel = async (id) => {
    try {
      const response = await fetch(`${Config.webApiUrl}/hotels/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error("Hotel not found");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if(hotelId){
      setError(null);
      setIsLoading(true);
      loadHotel(hotelId).then((data) => {
        setHotel(data);
      }).catch((e) => {
        setError("Hotel not found");
      }).finally(() => setIsLoading(false));

    }
  }, [hotelId]);

  if(!hotel && error){
    return <Typography variant="h5" color="error">{error}</Typography>;
  }
  if(!hotel || isLoading){
    return <Loading visible={true}/>;
  }

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

        <Box sx={{ mt: 3, px: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              alt="Hotel Main Image"
              height="300"
              image="/path/to/hotel-image.jpg"
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>{hotel.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {hotel.address.name}, {hotel.address.city.name} - {hotel.address.city.zipCode}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5">Available Rooms</Typography>
            <Divider sx={{ mb: 2 }} />
            {/*<Grid container spacing={2}>
              {hotel.rooms && hotel.rooms.map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room.id}>
                  <Card elevation={3}>
                    <CardMedia
                      component="img"
                      alt="Room Image"
                      height="150"
                      image="/path/to/room-image.jpg"
                    />
                    <CardContent>
                      <Typography variant="h6">{room.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Max Guests: {room.maxGuests}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price per night: ${room.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>*/}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>About the Hotel</Typography>
              <Typography variant="body1">
                {hotel?.description || 'A beautiful hotel offering excellent amenities and comfortable rooms.'}
              </Typography>
            </Paper>
          </Box>
        </Box>
        </>
  );
}