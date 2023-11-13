import { useState } from "react";
import Search from "../../assets/search-svgrepo-com.svg";
import { useEffect } from "react";
import { getCountryList } from "../../services/countryService";
import Countries from "../Countries";
import './style.scss'
const Home = () => {
  const [countryList, setCountryList] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    (async () => {
      const countries = await getCountryList();
      setCountryList(countries);
    })();
  }, [searchCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchedCountryList = countryList.filter((country) => {
      return country.name.common
        .toUpperCase()
        .includes(searchCountry.toUpperCase());
    });
    setCountryList(searchedCountryList);
  };

  const handleSearch = (e) => {
    setSearchCountry(e.target.value);
  };

  const handleFilter = async (e) => {
    setFilterOption(e.target.value);
    const countries = await getCountryList();
    const filteredCountryList = countries.filter((country) => {
      return country.region === e.target.value;
    });
    setCountryList(filteredCountryList);
  };

  return (
    <>
      <main>
        <div className="search-and-filter">
          <form className="search" onKeyUp={handleSubmit}>
            <button>
              <img src={Search} alt="" />
            </button>
            <input
              type="text"
              placeholder="Search for a country"
              onChange={(e) => handleSearch(e)}
              value={searchCountry}
            />
          </form>
          <select
            name=""
            id=""
            className="filter"
            value={filterOption}
            onChange={(e) => handleFilter(e)}
          >
            <option value="" selected disabled hidden>
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <Countries countryList={countryList} />
      </main>
    </>
  );
};

export default Home;
