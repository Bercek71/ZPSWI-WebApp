import {Autocomplete, Box, IconButton, InputAdornment, Stack, TextField, useTheme} from "@mui/material";
import useCityLoader from "../../loaders/useCityLoader.jsx";
import {useCallback, useEffect, useState} from "react";
import {Form, useNavigate, useSearchParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import Config from "../../config.jsx";
import {LocationCity, LocationOn, People} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {DateRangePicker, SingleInputDateRangeField} from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

export function Search(props) {
  const theme = useTheme();
  const {cities} = useCityLoader();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {enqueueSnackbar} = useSnackbar();
  const [options, setOptions] = useState([]);
  const [autoVal, setAutoVal] = useState();
  const [checkInValue, setCheckIn] = useState('');
  const [checkOutValue, setCheckOut] = useState('');
  const [guestsValue, setGuests] = useState(1);
  const [cityId, setCityId] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [searchParams, ] = useSearchParams();

  const onCheckinValueChange = (e) => setCheckIn(e.target.value);
  const onChange = (e, value) => {
    if (value.type === "city") {
      setCityId(value.id);
      setCountryId(value.countryId);
    } else {
      setCityId(null);
      setCountryId(value.id);
    }
  };

  const onCheckOutChange = (e) => setCheckOut(e.target.value)

  const onGuestsChange = (e) => e.target.value > 0 ? setGuests(e.target.value) : null

  useEffect(() => {
    if (searchParams.get("checkIn")) {
      setCheckIn(searchParams.get("checkIn"));
    }
    if (searchParams.get("checkOut")) {
      setCheckOut(searchParams.get("checkOut"));
    }
    if (searchParams.get("guests")) {
      setGuests(searchParams.get("guests"));
    }
    if(searchParams.get("cityId")){
      setCityId(searchParams.get("cityId"));
      cities && setAutoVal({...cities.find(city => city.id === parseInt(searchParams.get("cityId"))), type: 'city'});

    }
    if(searchParams.get("countryId")){
      setCountryId(searchParams.get("countryId"));
      searchParams.get("cityId") || setAutoVal({...countries.find(country => country.id === parseInt(searchParams.get("countryId"))), type: 'country'});
    }

  }, [cities, searchParams]);

  useEffect(() => {
    if (cities && countries) {
      setOptions(cities.map((city) => ({...city, type: 'city'})).concat(countries.map((country) => ({
        ...country,
        type: 'country'
      }))));
    }

  }, [cities, countries]);

  const handleSearchClick = useCallback((e) => {
    e.preventDefault();
    const newSearchParams = {};
    if (!cityId && !countryId) {
      setError("Please select destination");
      enqueueSnackbar("Please select destination", {variant: "error"});
      return;
    }
    if (cityId) {
      newSearchParams.cityId = cityId;

    } else if (countryId) {
      newSearchParams.countryId = countryId;
    }
    if (!checkInValue || !checkOutValue) {
      setError("Please select check-in and check-out dates");
      enqueueSnackbar("Please select check-in and check-out dates", {variant: "error"});
      return;
    } else {
      newSearchParams.checkIn = checkInValue;
      newSearchParams.checkOut = checkOutValue;
    }
    newSearchParams.guests = guestsValue;
    const country = countries.find(country => country.id === newSearchParams.countryId);
    const city = cities.find(city => city.id === newSearchParams.cityId);
    if (!country?.name && !city?.name) {
      navigate(`/search-results?${new URLSearchParams(newSearchParams).toString()}`);

      return;
    }
    const searchParamsExtended = {...newSearchParams, countryName: country?.name, cityName: city?.name};

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

    navigate(`/search-results?${new URLSearchParams(newSearchParams).toString()}`);
  }, [checkInValue, checkOutValue, cities, cityId, countries, countryId, enqueueSnackbar, guestsValue, navigate])


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
      width: "75%",
      height: "auto",
      textAlign: "center",
      zIndex: 1000, // Ensure it's above the background sections
      overflow: "visible",
    }}
  >
    <Form onSubmit={handleSearchClick} >
    <Stack direction={"row"} spacing={0.5}>
      <Autocomplete
        renderOption={(props, option) => (
          <li {...props} key={props.key}>
            {option.type === "city" ? <LocationCity/> : <LocationOn/>} {option.name}
          </li>
        )}
        getOptionKey={(option) => option.id + option.type}
        fullWidth
        value={autoVal ?? null}
        getOptionLabel={(option) => option.name}
        options={options}
        onChange={(event, value,) => {
          setAutoVal(value);
          onChange(event, value);
        }}
        sx={{width: "33%", backgroundColor: "white", color: "white"}}
        renderInput={(params) => <TextField
          {...params}
          error={error && (!cityId || !countryId)}
          variant={"filled"} label="Where do you want to go?"/>}
      />
      <DateRangePicker
        slots={{field: SingleInputDateRangeField}}
        variant="filled"
        id="check-in"
        fullWidth
        sx={{mr: 2, color: "grey.200", backgroundColor: "grey.200", width: "33%"}}
        value={[new dayjs(checkInValue), new dayjs(checkOutValue)]}
        onChange={(value) => {
          if (value[0]) {
            const newValue = {
              target: {
                value: `${value[0].$y}-${(value[0].$M + 1).toString().padStart(2, '0')}-${value[0].$D.toString().padStart(2, '0')}`
              }
            }
            onCheckinValueChange(newValue);
          }
          if (value[1]) {
            const newValue = {
              target: {
                value: `${value[1].$y}-${(value[1].$M + 1).toString().padStart(2, '0')}-${value[1].$D.toString().padStart(2, '0')}`
              }
            }
            onCheckOutChange(newValue);
          }
        }}

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
        value={guestsValue}
        onChange={onGuestsChange}
        sx={{mr: 2, color: "white", backgroundColor: "white", width: "33%"}}
      />

      <IconButton onSubmit={handleSearchClick} type="submit" sx={{p: 1, color: "white"}}>
        <SearchIcon/>
      </IconButton>
    </Stack>
    </Form>

  </Box>;
}