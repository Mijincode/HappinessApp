import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalWarning from "./ModalWarning";

const API_URL = `https://d2h6rsg43otiqk.cloudfront.net/prod`;
const API_KEY = "EzensCqxyl63t09mVG6jr2AXriDQeimS95s4CdpV";
const TOKEN = localStorage.getItem("token");

export default function Factors({ isLoggedIn }) {
  const [year, setYear] = useState("2020");
  const [country, setCountry] = useState("");
  const [isLoggedInNow, setIsLoggedInNow] = useState(isLoggedIn);
  const [shouldShowLoginWarning, SetShouldShowLoginWarning] = useState(false);
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [countries, setCountries] = useState([]);
  const [gridOptions, setGridOptions] = useState({
    columnDefs: [
      { headerName: "Rank", field: "rank", sortable: true },
      { headerName: "Country", field: "country", sortable: true },
      { headerName: "Score", field: "score", sortable: true },
      { headerName: "Economy", field: "economy", sortable: true },
      { headerName: "Family", field: "family", sortable: true },
      { headerName: "Health", field: "health", sortable: true },
      { headerName: "Freedom", field: "freedom", sortable: true },
      { headerName: "Generosity", field: "generosity", sortable: true },
      { headerName: "Trust", field: "trust", sortable: true },
    ],
  });

  useEffect(() => {
    setIsLoggedInNow(isLoggedIn);
  }, [year, country]);

  useEffect(() => {
    fetchCountries();
  }, []);

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

  const getFactors = async () => {
    if (!isLoggedInNow) SetShouldShowLoginWarning(true);
    const url = `${API_URL}/factors/${year}?country=${country}&limit=50`;

    SetShouldShowLoginWarning(true);

    if (isLoggedInNow) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "X-API-KEY": API_KEY,
            Authorization: `Bearer ${TOKEN}`,
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
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <div>
      {shouldShowLoginWarning && <ModalWarning isLoggedIn={isLoggedInNow} />}
      <h2>Factors</h2>
      <label htmlFor="year">Select Year:</label>
      <select
        id="year"
        placeholder="Enter Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={{ marginRight: "10px" }}
      >
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
      </select>{" "}
      <label htmlFor="country">Enter Country:</label>
      <input
        type="text"
        id="country"
        placeholder="Enter Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        autoComplete="country"
      />
      <button onClick={getFactors}>Click</button>
      {error && <p>Error: {error.message}</p>}
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={gridOptions.columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          enableSorting={true}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}
