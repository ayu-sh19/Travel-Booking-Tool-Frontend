import React, { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import axios from "axios";

function LocationInput({ ...props }, ref) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const authToken = '';

  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery || !authToken) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          params: { keyword: searchQuery, subType: "CITY,AIRPORT" },
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      setSuggestions(response.data.data);
    } catch (error) {
      console.error("Error in fetch locations", error);
    }
  };

  const debounceFetchSuggestions = useCallback(
    debounce((searchQuery) => {
      fetchSuggestions(searchQuery);
    }, 500),
    [authToken]
  );

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounceFetchSuggestions(newQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.iataCode);
    setSuggestions([]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <input
        type="text"
        {...props}
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a location..."
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        ref={ref}
      ></input>
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, border: "1px solid #ccc" }}>
          {suggestions.map((item) => (
            <li
              key={item.iataCode || item.detailedName || item.name}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              
            >
              {item.name} {item.iataCode ? `(${item.iataCode})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default React.forwardRef(LocationInput);
