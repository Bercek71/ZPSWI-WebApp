import React, {useCallback, useEffect, useState} from "react";
import {Button, CircularProgress, Snackbar} from "@mui/material";
import {useSnackbar} from "notistack";

export function SubmitButton(props) {
  const [isError, setIsError] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(event);
    }
  })

  useEffect(() => {
    if (props.error) {
      setIsError(true);
      const timeout = setTimeout(() => setIsError(false), 5000);
      enqueueSnackbar(props.error, {variant: "error"});
      return () => clearTimeout(timeout);
    }
  }, [enqueueSnackbar, props.error]);

  return(
  <>
    <Button onClick={handleSubmit} sx={{transition: "all 0.3s ease"}} color={isError ? "error" : "primary"}
            disabled={props.isLoading} type="submit" variant="contained" fullWidth>
      {props?.text} {props.isLoading ?
      <CircularProgress size={20} sx={{marginX: 1}}/> : React.cloneElement(props.icon, {sx: {marginX: 1}})}
    </Button>
  </>
  )
}