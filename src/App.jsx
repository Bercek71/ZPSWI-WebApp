import RouteWrapper from "./components/RouteWrapper.jsx";
import {SnackbarProvider} from "notistack";

function App() {

  return (
    <>
      <SnackbarProvider maxSnack={4}>
        <RouteWrapper/>
      </SnackbarProvider>
    </>
  )
}

export default App
