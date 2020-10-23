import React, { useEffect, useRef, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useClickAway } from "../../../hooks";
import "./SearchField.scss";

/**
 * Main search field
 */
const SearchField = ({ className, open, ...other }) => {
  const [showSearchField, setShowSearchField] = useState(open);
  const rootRef = useRef();

  const classNameProp =
    (className || "") + (showSearchField ? " SearchField-showed" : "");

  useClickAway(rootRef, () => {
    if (!open) {
      setShowSearchField(false);
    }
  });

  const handleSearchIconClick = () => {
    setShowSearchField(true);
  };

  useEffect(() => {
    setShowSearchField(open);
  }, [open]);

  return (
    <div className={"nav-search" + classNameProp} ref={rootRef}>
      <FontAwesomeIcon
        icon={faSearch}
        className="search-icon"
        onClick={handleSearchIconClick}
      />
      <input
        {...other}
        type="search"
        placeholder="Title, genres, people..."
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export { SearchField };
export default SearchField;
