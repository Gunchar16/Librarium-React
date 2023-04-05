import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    history(`books/search?text=${query}`);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
}