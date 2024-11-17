import {Search} from "../components/MainPage/Search.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {useSearchParams} from "react-router-dom";

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

  useEffect(() => {
    if(searchParams){
      setCheckIn(searchParams.get("checkIn"));
      setCheckOut(searchParams.get("checkOut"));
      setGuests(searchParams.get("guests"));
      setCityId(searchParams.get("cityId"));
      setCountryId(searchParams.get("countryId"));
      setIsLoading(false);
    }

  }, [searchParams]);

    console.log(defaultCountryId);
    console.log(defaultCityId);


    return (
      <>
      <Search
        top={"16%"}
        onChange={(e, value) => {
          if (value.type === "city") {
            setCityId(value.id);
            setCountryId(value.countryId);
          } else {
            setCityId(null);
            setCountryId(value.id);
          }
        }}
        defaultCityId={defaultCityId} defaultCountryId={defaultCountryId}
        cityId={cityId} countryId={countryId}
        checkInValue={checkIn} onCheckinChange={(e) => setCheckIn(e.target.value)} checkOutValue={checkOut}
        onCheckOutChange={(e) => setCheckOut(e.target.value)} guestsValue={guests}
        onGuestsChange={(e) => e.target.value > 0 ? setGuests(e.target.value) : null}/>
      <Loading visible={isLoading}/>
      </>
    );
}