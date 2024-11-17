import {Autocomplete, Box, IconButton, InputAdornment, Stack, TextField, useControlled, useTheme} from "@mui/material";
import useCityLoader from "../../loaders/useCityLoader.jsx";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import Config from "../../config.jsx";
import {FlightLand, FlightTakeoff, LocationCity, LocationOn, People} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

export function Search(props) {
  const theme = useTheme();
  const {cities} = useCityLoader();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {enqueueSnackbar} = useSnackbar();
  const [options, setOptions] = useState([]);
  const [autoVal, setAutoVal] = useState();

  useEffect(() => {
    if (cities && countries) {
      setOptions(cities.map((city) => ({...city, type: 'city'})).concat(countries.map((country) => ({
        ...country,
        type: 'country'
      }))));
    }
    if (props.defaultCityId) {
      const city = cities.find(city => city.id === props.defaultCityId);
      if (city) {
        setAutoVal({...city, type: 'city'});
      }
    } else if (props.defaultCountryId) {
      const country = countries.find(country => country.id === props.defaultCountryId);
      if (country) {
        setAutoVal({...country, type: 'country'});
      }
    }
  }, [cities, countries]);

  const handleSearchClick = useCallback(() => {
    const searchParams = {};
    if (!props.cityId && !props.countryId) {
      setError("Please select destination");
      enqueueSnackbar("Please select destination", {variant: "error"});
      return;
    }
    if (props.cityId) {
      searchParams.cityId = props.cityId;
    } else if (props.countryId) {
      searchParams.countryId = props.countryId;
    }
    if (!props.checkInValue || !props.checkOutValue) {
      setError("Please select check-in and check-out dates");
      enqueueSnackbar("Please select check-in and check-out dates", {variant: "error"});
      return;
    } else {
      searchParams.checkIn = props.checkInValue;
      searchParams.checkOut = props.checkOutValue;
    }
    searchParams.guests = props.guestsValue;
    const country = countries.find(country => country.id === searchParams.countryId);
    const city = cities.find(city => city.id === searchParams.cityId);
    const searchParamsExtended = {...searchParams, countryName: country?.name, cityName: city?.name};

    if (localStorage.getItem('lastSearchResults')) {


      const lastSearchResultsString = localStorage.getItem("lastSearchResults");
      try {
        const lastSearchResults = JSON.parse(lastSearchResultsString);
        if (lastSearchResults.length > 0) {

          if (lastSearchResults.length < 5) {
            localStorage.setItem("lastSearchResults", JSON.stringify([searchParamsExtended, ...lastSearchResults]));
          } else {
            localStorage.setItem("lastSearchResults", JSON.stringify([searchParamsExtended, ...lastSearchResults.slice(0, 4)]));
          }
        }
      } catch (e) {
        localStorage.removeItem("lastSearchResults");
        localStorage.setItem("lastSearchResults", JSON.stringify([searchParamsExtended]));
      }
    } else {
      localStorage.setItem("lastSearchResults", JSON.stringify([searchParamsExtended]));
    }

    navigate(`/search-results?${new URLSearchParams(searchParams).toString()}`);
  }, [cities, countries, enqueueSnackbar, navigate, props.checkInValue, props.checkOutValue, props.cityId, props.countryId, props.guestsValue])


  useEffect(() => {
    fetch(Config.webApiUrl + '/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);
  return <Box
    sx={{
      position: "absolute",
      top: props.top ?? "30%", // Position halfway between the top and bottom
      left: "50%",
      transform: "translate(-50%, -50%)", // Center on the screen
      backgroundColor: "orange",
      padding: theme.spacing(1),
      borderRadius: "16px",
      boxShadow: theme.shadows[5],
      maxWidth: "80%",
      width: "60%",
      height: "auto",
      textAlign: "center",
      zIndex: 1000, // Ensure it's above the background sections
      overflow: "visible",
    }}
  >
    <Stack direction={"row"} spacing={0.5}>

      <Autocomplete
        renderOption={(props, option) => (
          <li {...props} key={props.key}>
            {option.type === "city" ? <LocationCity/> : <LocationOn/>} {option.name}
          </li>
        )}
        getOptionKey={(option) => option.id + option.type}
        value={autoVal ?? null}
        getOptionLabel={(option) => option.name}
        options={options}
        onChange={(event, value, reason, details) => {
          setAutoVal(value);
          if (props.onChange) {
            props.onChange(event, value)
          }
        }}
        sx={{width: 300, backgroundColor: "white", color: "white"}}
        renderInput={(params) => <TextField
          {...params}
          error={error && (!props.cityId || !props.countryId)}
          variant={"filled"} label="Where do you want to go?"/>}
      />
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FlightLand/>
              </InputAdornment>
            ),
          },
        }}
        id="check-in"
        label="Check-in Date"
        type="date"
        sx={{mr: 2, color: "white", backgroundColor: "white", width: "30%"}}
        variant="filled"
        value={props.checkInValue}
        onChange={props.onCheckinChange}
      />
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoff/>
              </InputAdornment>
            ),
          },
        }}
        id="check-out"
        label="Check-out Date"
        type="date"
        InputLabelProps={{shrink: true}}
        variant="filled"
        value={props.checkOutValue}
        onChange={props.onCheckOutChange}
        sx={{mr: 2, color: "white", backgroundColor: "white", width: "30%"}}
      />
      <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <People/>
              </InputAdornment>
            ),
          },
        }}
        id="guests"
        label="Number of Guests"
        type="number"
        variant="filled"
        value={props.guestsValue}
        onChange={props.onGuestsChange}
        sx={{mr: 2, color: "white", backgroundColor: "white"}}
        inputProps={{min: 1}}
      />

      <IconButton onClick={handleSearchClick} type="button" sx={{p: 1, color: "white"}}>
        <SearchIcon/>
      </IconButton>
    </Stack>

  </Box>;
}