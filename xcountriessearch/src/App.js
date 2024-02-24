import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (err) {
        console.log(`Error encountered : ${err}`);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery)
    );
    setFilteredCountries(filtered);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search by country name"
          onChange={handleInput}
        />
      </div>
      <div className="container">
        {filteredCountries.map((country) => (
          <div key={country.ccn3} className="flexContainer">
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{ height: "100px", width: "100px" }}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
