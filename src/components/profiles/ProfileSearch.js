import PropTypes from "prop-types";
import { useState } from "react";
import BreedSelect from "./BreedSelect";
import DateInput from "./DateInput";
import DispositionSelect from "./DispositionSelect";
import FilterContainer from "./FilterContainer";
import SearchResults from "./SearchResults";
import TypeSelect from "./TypeSelect";

export default function ProfileSearch({ types, dispositions }) {
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [disposition, setDisposition] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  function handleTypeChange(event) {
    setBreed("");
    setType(event.target.value);
  }

  function handleBreedChange(event) {
    setBreed(event.target.value);
  }

  function handleDispositionChange(event) {
    setDisposition(event.target.value);
  }

  function handleCreatedAtChange(event) {
    setCreatedAt(event.target.value);
  }

  return (
    <>
      <FilterContainer>
        <TypeSelect options={types} onChange={handleTypeChange} />
        <BreedSelect type={type} onChange={handleBreedChange} />
        <DispositionSelect
          options={dispositions}
          onChange={handleDispositionChange}
        />
        <DateInput onChange={handleCreatedAtChange} />
      </FilterContainer>
      <SearchResults
        type={type}
        breed={breed}
        disposition={disposition}
        createdAt={createdAt}
      />
    </>
  );
}

ProfileSearch.propTypes = {
  types: PropTypes.arrayOf(PropTypes.object),
  dispositions: PropTypes.arrayOf(PropTypes.object),
};
