
import CountryDetails from "./components/CountryDetails";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
      <header>
        <h2>Where in the world ?</h2>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<CountryDetails />} />
      </Routes>
    </>
  );
}

export default App;
