import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Search} from "../components/MainPage/Search.jsx";
import {
  Box, Button,
  Card,
  CardContent,
  CardMedia,
  Dialog, DialogActions, DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import Loading from "../components/Loading.jsx";
import Config from "../config.jsx";

function CloseIcon() {
  return null;
}

export default function HotelDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {hotelId} = useParams();
  const [hotel, setHotel] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadHotel = async (id) => {
    try {
      const response = await fetch(`${Config.webApiUrl}/hotels/${id}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Hotel not found");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (hotelId) {
      setError(null);
      setIsLoading(true);
      loadHotel(hotelId).then((data) => {
        setHotel(data);
      }).catch((e) => {
        setError("Hotel not found");
      }).finally(() => setIsLoading(false));

    }
  }, [hotelId]);

  if (!hotel && error) {
    return <Typography variant="h5" color="error">{error}</Typography>;
  }
  if (!hotel || isLoading) {
    return <Loading visible={true}/>;
  }

  return (
    <>
      <Search top={"140px"}/>

      <Box sx={{mt: 3, px: 3}}>
        <Card sx={{mb: 3, position: "relative", height: 400, overflow: "hidden"}} onClick={handleClickOpen}>
          <CardMedia
            component="img"
            alt="Hotel Main Image"
            image="/HotelImage.jpg"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "60%",
              zIndex: 2,
            }}
          />
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              color: "black",
              zIndex: 3,
              padding: 2,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <Typography variant="h4" gutterBottom>{hotel.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {hotel.address.name}, {hotel.address.city.name} - {hotel.address.city.zipCode}
            </Typography>
          </CardContent>
        </Card>

        {/* Modal Dialog for Image Gallery */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close"
                        sx={{position: 'absolute', right: 8, top: 8}}>
              <CloseIcon/>
            </IconButton>
            <Typography variant="h6">Hotel Gallery</Typography>
          </DialogTitle>
          <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
            <img src="/HotelImage.jpg" alt="Hotel Gallery"
                 style={{width: '100%', maxHeight: '80vh', objectFit: 'contain'}}/>
          </DialogContent>
          <DialogActions>
            <Button variant={"outlined"} onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <Box sx={{mb: 3}}>
          <Typography variant="h5">Available Rooms</Typography>
          <Divider sx={{mb: 2}}/>
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

        <Box sx={{mt: 3}}>
          <Paper elevation={1} sx={{p: 2}}>
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