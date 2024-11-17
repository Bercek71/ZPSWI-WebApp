import {
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {Event, Person} from "@mui/icons-material";

export default function LastSearchResultCard({searchResult}) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    const searchRes = {
      cityId: searchResult.cityId ,
      countryId: searchResult.countryId,
      checkIn: searchResult.checkIn,
      checkOut: searchResult.checkOut,
      guests: searchResult.guests
    }
    navigate("/search-results?" + new URLSearchParams(searchRes).toString());
  }, [navigate, searchResult]);

  console.log(searchResult)
  if(!searchResult){
    return null;
  }

  return (
    <CardActionArea onClick={handleCardClick}>
    <Paper onClick={handleCardClick}
            sx={{cursor: 'pointer'}}
    >
    <Card sx={{ display: "flex", padding: 2, gap: 2, width: "280px", height: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, borderRadius: 1 }}
        image="https://cf.bstatic.com/xdata/images/city/64x64/653172.jpg?k=7f27dcc9202d8b94c667e446798404cc05350041c6b9332829723bcce5bf759b&o="
        alt="City Image"
      />
      <Stack spacing={1} sx={{ flex: 1 }}>
        {/* Title */}
        <Typography variant="h6">{searchResult?.cityName ?? searchResult?.countryName}</Typography>

        {/* Date and Guests Info */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Event fontSize="small" />
          <Typography variant="body2">{searchResult.checkIn} - {searchResult.checkOut}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Person fontSize="small" />
          <Typography variant="body2">{searchResult.guests}</Typography>
        </Stack>
      </Stack>
    </Card>
    </Paper>
    </CardActionArea>

  );
}