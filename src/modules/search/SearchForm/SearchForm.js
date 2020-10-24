import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchField } from "../SearchField";

export const SearchForm = ({ className, ...other }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/search/?query=" + searchTerm);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className={"SearchForm " + className} onSubmit={handleSubmit}>
      <SearchField {...other} value={searchTerm} onChange={handleChange} />
    </form>
  );
};

export default SearchForm;
