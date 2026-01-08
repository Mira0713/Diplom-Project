import React, { useState } from "react";
import Select from "react-select";
import "./styles.scss";

const FilterPanel = () => {
  // Пример данных для фильтров
  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
    { value: "sci-fi", label: "Sci-Fi" },
  ];

  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
    { value: "2018", label: "2018" },
    { value: "2017", label: "2017" },
    { value: "2016", label: "2016" },
    { value: "2015", label: "2015" },
    { value: "2014", label: "2014" },
    { value: "2013", label: "2013" },
    { value: "2012", label: "2012" },
    { value: "2011", label: "2011" },
    { value: "2010", label: "2010" },
    { value: "2009", label: "2009" },
    { value: "2008", label: "2008" },
  ];

  const sortOptions = [
    { value: "alphabet", label: "Alphabetically (A-Z)" },
    { value: "alphabet-desc", label: "Alphabetically (Z-A)" },
    { value: "year-asc", label: "Ascending year" },
    { value: "year-desc", label: "In descending order of year" },
    { value: "newest", label: "New first" },
    { value: "oldest", label: "Old first" },
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);

  return (
    <div className="filterPanel">
      <div className="filterSection">
        <h3>Genres</h3>
        <Select
          isMulti
          options={genreOptions}
          value={selectedGenres}
          onChange={setSelectedGenres}
          className="filterSelect"
          classNamePrefix="select"
          placeholder="Select genres..."
          noOptionsMessage={() => "Genres not found"}
        />
      </div>

      <div className="filterSection">
        <h3>Years</h3>
        <Select
          isMulti
          options={yearOptions}
          value={selectedYears}
          onChange={setSelectedYears}
          className="filterSelect"
          classNamePrefix="select"
          placeholder="Select year..."
          noOptionsMessage={() => "Years not found"}
        />
      </div>

      <div className="sortSection">
        <div className="filterSection">
          <h3>Sorting</h3>
          <Select
            options={sortOptions}
            value={selectedSort}
            onChange={setSelectedSort}
            className="filterSelect"
            classNamePrefix="select"
            placeholder="Sort by..."
            isClearable
          />
        </div>
        <button className="applyFilters">Apply filters</button>
      </div>
    </div>
  );
};

export default FilterPanel;
