import RouteWrapper from "./components/RouteWrapper.jsx";
import {SnackbarProvider} from "notistack";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import "./App.css"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";


// using theme pallete:
// https://colorhunt.co/palette/f9ed69f08a5db83b5e6a2c70
// #F9ED69
// #F08A5D
// #B83B5E
// #6A2C70

const theme = createTheme({
  fontFamily: "Open Sans",
  palette:
    {
      primary: {
        main: '#013681',
      },
      secondary: {
        main: '#009fe3',
      },
      error: {
        main: '#B83B5E',
      },
      info: {
        main: '#ffffff',
      },

    }
})

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider maxSnack={4}>
          <RouteWrapper/>
        </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
