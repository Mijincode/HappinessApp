import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";

export default function Ranking() {
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [countries, setCountries] = useState([]);
  const [gridOptions, setGridOptions] = useState({
    columnDefs: [
      { headerName: "Rank", field: "rank" },
      { headerName: "Country", field: "country" },
      { headerName: "Score", field: "score" },
      { headerName: "Year", field: "year" },
    ],
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country && year) {
      getRankings();
    }
  }, [,]);

  const fetchCountries = async () => {
    const countriesUrl = `${API_URL}/countries`;
    try {
      const response = await fetch(countriesUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to load countries");
      }
      const countriesData = await response.json();
      setCountries(countriesData);
    } catch (error) {
      setError(error);
    }
  };

  const getRankings = async () => {
    const url =
      year === "all"
        ? `${API_URL}/rankings?&country=${country}`
        : `${API_URL}/rankings?year=${year}&country=${country}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to load");
      }
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleGetData = () => {
    getRankings();
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <div>
      <h2>Happiness Country Rankings</h2>
      <label htmlFor="year">Select Year:</label>

      <select
        id="year"
        placeholder="Enter Year"
        value={year}
        onChange={(e) => {
          console.log(e);
          setYear(e.target.value);
        }}
        style={{ marginRight: "20px" }}
      >
        <option value="all">All Years</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
      </select>

      <label htmlFor="country">Select Country:</label>
      <select
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        style={{ marginRight: "20px" }}
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      <label htmlFor="country">Enter Country:</label>
      <input
        type="text"
        id="country"
        placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        autoComplete="country"
        style={{ marginBottom: "20px" }}
      />

      <button onClick={handleGetData}>Click</button>
      {error && <p>Error fetching data: {error.message}</p>}
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          gridOptions={gridOptions}
          rowData={rowData}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}
