
import React, { useState } from "react";

export default function Searchbar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Enter the city "
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="text-black flex-1 p-2 border border-gray-300 rounded-l-lg outline-none placeholder:text-gray-700"
      />
      <button
        className="bg-black/50 text-white border cursor-pointer p-2 hover:bg-black/70 rounded-r-lg backdrop-blur-sm"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
