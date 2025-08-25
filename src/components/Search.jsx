import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react"; // icon for search button

const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const recommendedCities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Dubai",
    "Mumbai",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (selected) => {
    setCity(selected);
    onSearch(selected);
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-lg mx-auto hover:shadow-xl">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a city..."
          className="flex-1 px-4 py-2 bg-[#202B3E] text-white border border-[#33435E] rounded-l-xl outline-none"
        />
        <button
          type="submit"
          className="px-4 bg-[#33435E] text-white rounded-r-xl cursor-pointer hover:bg-[#46536B] flex items-center justify-center"
        >
          <SearchIcon size={18} />
        </button>
      </form>

      {showDropdown && (
        <div className="absolute mt-2 w-full bg-[#202B3E] rounded-2xl shadow-lg z-10">
          {recommendedCities.map((c) => (
            <div
              key={c}
              onClick={() => handleSelectCity(c)}
              className="px-4 py-2 text-white hover:bg-[#33435E] rounded-lg cursor-pointer transition"
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
